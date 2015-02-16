(function (angular) {
	'use strict';

	angular.module('battlesnake.show-viewer')
		.service('showViewerLocale', showViewerLocale);

	function showViewerLocale() {
		this.en = {
			openInNewWindow: 'Open in new window',
			programmeHomepage: 'Programme page',
			alternativeListening: 'Alternative listening options',
			showPlaylist: 'Show playlist',
			download: 'Download'
		};
		this.et = {
			openInNewWindow: 'Ava uues aknas',
			programmeHomepage: 'Saatesarja kodulehele',
			alternativeListening: 'Alternatiivsed kuulamise variandid',
			showPlaylist: 'Näita lugusid',
			download: 'Lae alla'
		};
		this.ru = {
			openInNewWindow: null,
			programmeHomepage: null,
			alternativeListening: null,
			showPlaylist: null,
			download: null
		};
	}

})(window.angular);
