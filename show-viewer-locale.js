(function (angular) {
	'use strict';

	angular.module('battlesnake.show-viewer')
		.service('showViewerLocale', showViewerLocale);

	function showViewerLocale() {
		this.en = {
			openInNewWindow: 'Open in new window',
			programmeHomepage: 'Programme page',
			alternativeListening: 'Alternative listening options'
		};
		this.et = {
			openInNewWindow: 'Ava uues aknas',
			programmeHomepage: 'Saatesarja kodulehele',
			alternativeListening: 'Alternatiivsed kuulamise variandid'
		};
		this.ru = {
			openInNewWindow: null,
			programmeHomepage: null,
			alternativeListening: null
		};
	}

})(window.angular);
