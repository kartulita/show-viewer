(function (angular) {
	'use strict';

	angular.module('battlesnake.show-viewer')
		.directive('showViewer', showViewerDirective);

	function showViewerDirective() {
		return {
			restrict: 'A',
			require: 'showViewer',
			controller: 'showViewerController',
			scope: {
				show: '=showViewer',
			},
			templateUrl: 'show-viewer-template.html',
			link: link
		};

		function link(scope, element, attrs, controller) {
			controller.init();
		}
	}

})(window.angular);
