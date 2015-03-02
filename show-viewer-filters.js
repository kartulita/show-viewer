(function (angular) {
	'use strict';

	angular.module('battlesnake.show-viewer')
		.filter('showViewerDateTime', showViewerDateTimeFilter)
		;

	function showViewerDateTimeFilter() {
		return function (when) {
			if (!when) {
				return '';
			}
			return when.local().format('DD.MM.YYYY HH:mm');
		};
	}

})(window.angular);
