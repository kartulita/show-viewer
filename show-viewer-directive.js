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
			templateUrl: '../show-viewer-template.html',
			link: link
		};

		function link(scope, element, attrs) {
			scope.selectSource = selectSource;
			scope.$watch('show', showChanged);
			return;

			function showChanged() {
				var show = scope.show;
				if (show && show.media && show.media.sources && show.media.sources.length) {
					selectSource(show.media.sources[0]);
				} else {
					scope.activeSource = null;
				}
			}

			function selectSource(source) {
				scope.activeSource = source;
			}
		}
	}

})(window.angular);
