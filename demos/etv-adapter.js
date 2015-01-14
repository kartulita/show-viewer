(function (angular) {
	'use strict';

	/*
	 * See etv-adapter in timeline demos folder
	 */
	angular.module('demo')
		.value('ETVEndpoint', 'http://etv.err.ee/api/loader')
		.value('languageId', 0)
		.factory('ETVTimelineAdapter', ETVTimelineAdapter)
		.factory('ETVShowViewerAdapter', ETVShowViewerAdapter)
		;

	function ETVTimelineAdapter(ETVEndpoint) {
		return {
			/* URL to get timeline items per day */
			endpoint: ETVEndpoint + '/GetTimelineDay',
			/* Applied to each retrieved timeline item to map it to the view's format */
			mapItem: mapItem,
		};

		function mapItem(item) {

			return {
				/* Unique ID of item */
				id: item.Id,
				/* Title of item */
				title: item.HeaderLong,
				/* Start time */
				start: moment(item.Published),
				/* Address of image to display in timeline */
				thumbnail: getThumbnailUrl(item),
				/* Address of larger image (not used yet) */
				image: getImageUrl(item),
				/* Store original item data for viewer */
				itemData: item
			};

			function getThumbnailUrl(item) {
				return 'http://static.err.ee/gridfs/' + item.Image +
					'?width=300&height=300&mode=crop&quality=25';
			}

			function getImageUrl(item) {
				return 'http://static.err.ee/gridfs/' + item.Image +
					'?width=600&height=600&mode=crop&quality=75';
			}
		}
	}

	function ETVShowViewerAdapter($http, $sce, languageId, ETVEndpoint) {

		return {
			getDetails: getDetails
		};

		/* Map show item (backend format) to show-viewer format */
		function getDetails(item) {
			if (item.Id.match(/^[0\-]+$/)) {
				return new ShowData(item);
			} else {
				return $http.get(ETVEndpoint + '/GetTimelineContent/' + item.Id)
					.then(function (response) {
						return new ShowData(item, response.data);
					});
			}

			function ShowData(baseData, contentData) {
				contentData = contentData || {};
				this.baseData = baseData;
				this.contentData = contentData;
				this.title = getText(contentData.Texts, baseData.HeaderLong || baseData.Header, 'Header');
				this.image = getImage(contentData.Image || baseData.Image);
				this.description = $sce.trustAsHtml(getText(contentData.Texts, baseData.Lead, 'Lead'));
				this.start = moment(contentData.Published || contentData.Created || baseData.Published),
				/* TODO: GetCategoryUrlForPrimaryCategory */
				this.categoryUrl = contentData.PrimaryCategoryId;
				this.targetUrl = contentData.Url;
				/* TODO: channelUrl */
				this.channelurl = '';
				if (contentData.disableList) {
					this.media = null;
				} else {
					var sources = _(contentData.MediaSources || []).chain()
						.filter(function (source) { return !!source; })
						.map(JSON.stringify.bind(JSON))
						.uniq()
						.map(JSON.parse.bind(JSON))
						.value();
					this.media = sources.length ? new MediaList(this, sources, contentData) : null;
				}
			}

			function getImage(image) {
				if (typeof image === 'string') {
					return image;
				} else if (typeof image === 'object') {
					return 'http://static.err.ee/gridfs/' + image.FileName + (image.ImageResizerOptions || '');
				} else {
					return null;
				}
			}

			function getText(texts, fallback, key) {
				var text;
				if (texts && texts.length) {
					text = _(texts).findWhere({ Language: languageId });
					if (!text) {
						text = texts[0];
					}
					return text[key];
				} else {
					return fallback;
				}
			}

			function MediaList(show, sources, data) {
				this.sources = _(sources).chain().map(mapSource).unique().value();
				this.select = selectSource;
				this.select(0);
				return;
			
				function mapSource(source) {
					var parts = source.Content.replace('://', '').split('@');
					var url = 'http://static.err.ee/media?' +
						[
							'stream=' + parts[0],
							'file=' + parts[1],
							'mediaspace=mediaframe',
							'autoplay=true',
							'mediamode=wowzavideo',
							'width=100',
							/* 'site=' + window.location.host, */
							'image=' + show.image
						].join('&');
					return $sce.trustAsResourceUrl(url);
				}

				function selectSource(index) {
					this.sourceIndex = index;
					this.source = this.sources[index];
				}
			}
		}
	}

})(window.angular);
