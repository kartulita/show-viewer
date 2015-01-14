(function (angular, moment) {
	'use strict';

	angular.module('battlesnake.show-viewer')
		.filter('showViewerDateTime', showViewerDateTimeFilter)
		;

	function showViewerDateTimeFilter() {
		return function (when) {
			return moment(when).local().format('DD.MM.YYYY HH:mm');
		};
	}

})(window.angular, window.moment);
