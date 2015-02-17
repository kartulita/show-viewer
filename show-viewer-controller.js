(function (angular) {
	'use strict';

	angular.module('battlesnake.show-viewer')
		.controller('showViewerController', showViewerController);

	function showViewerController($scope, languageService, showViewerLocale) {
		var scope = $scope;

		scope.strings = languageService(showViewerLocale);

		scope.view = {
			showPlaylist: false
		};

		scope.selectSource = selectSource;

		this.init = initController;

		return;

		function initController() {
			scope.$watch('show', showChanged);
		}

		function showChanged() {
			var show = scope.show;
			if (show && show.media && show.media.length) {
				selectSource(show.media[0]);
			} else {
				scope.activeSource = null;
			}
		}

		function selectSource(source) {
			scope.activeSource = source;
		}
	}

})(window.angular);
