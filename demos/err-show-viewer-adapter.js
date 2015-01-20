(function (angular) {
	'use strict';

	/*
	 * See etv-adapter in timeline demos folder
	 */
	angular.module('demo')
		.factory('ERRShowViewerAdapterFactory', ERRShowViewerAdapterFactory)
		;

	function ERRShowViewerAdapterFactory($http, $sce) {

		return getAdapter;
		
		function getAdapter(api, languageIndex) {
			var result = {
				endpoint: api + '/loader/GetTimelineContent',
				getDetails: getDetails
			};
			return result;

			/* Map show item (backend format) to show-viewer format */
			function getDetails(item) {
				if (item.Id.match(/^[0\-]+$/)) {
					return new ShowData(item);
				} else {
					return $http.get(result.endpoint + '/' + item.Id)
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
					this.start = moment(baseData.Published || contentData.Published || contentData.Created),
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
						return 'http://static.err.ee/gridfs/' + image.FileName + (image.ImageResizerOptions || '?width=600&height=600&mode=crop');
					} else {
						return null;
					}
				}

				function getText(texts, fallback, key) {
					var text;
					if (texts && texts.length) {
						text = _(texts).findWhere({ Language: languageIndex });
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
	}

})(window.angular);
