(function (angular) {
	'use strict';

	angular.module('battlesnake.show-viewer')
		.directive('showViewer', showViewerDirective);

	function showViewerDirective($window) {
		return {
			restrict: 'A',
			scope: {
				show: '=showViewer',
				collapsed: '@collapsed',
				collapsible: '@collapsible'
			},
			templateUrl: '../show-viewer-template.html',
			link: link
		};

		function link(scope, element, attrs) {
			scope.$watch('show', showChanged);
			return;

			function showChanged() {
				scope.collapsed = false;
			}
		}
	}

})(window.angular);
