(function (angular) {
	'use strict';

	angular.module('battlesnake.show-viewer')
		.directive('showViewer', showViewerDirective);

	function showViewerDirective() {
		return {
			restrict: 'A',
			scope: {
				show: '=showViewer',
			},
			templateUrl: '../show-viewer-template.html'
		};
	}

})(window.angular);
