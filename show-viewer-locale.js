(function (angular) {
	'use strict';

	angular.module('battlesnake.show-viewer')
		.service('showViewerLocale', showViewerLocale);

	/*
	 * Declared once and outside the factory since the injector hack used by
	 * show-viewer-adapter would otherwise get a new instance of the translations
	 */
	var strings = {
		en: {
			openInNewWindow: 'Open in new window',
			programmeHomepage: 'Programme page',
			alternativeListening: 'Alternative listening options',
			showPlaylist: 'Show playlist',
			download: 'Download'
		},
		et: {
			openInNewWindow: 'Ava uues aknas',
			programmeHomepage: 'Saatesarja kodulehele',
			alternativeListening: 'Alternatiivsed kuulamise variandid',
			showPlaylist: 'Näita lugusid',
			download: 'Lae alla'
		},
		ru: {
			openInNewWindow: 'Открыть в новом окне',
			programmeHomepage: 'На страницу передачи',
			alternativeListening: null,
			showPlaylist: null,
			download: null
		}
	};

	function showViewerLocale() {
		return strings;
	}

})(window.angular);
