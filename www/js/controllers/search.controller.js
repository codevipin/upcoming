angular.module('conFusion')

.controller('searchCtrl', function($scope, showDefaultResult, tvService) {

	var TvService = tvService;

	$scope.popularShow = showDefaultResult;

	$scope.toggleSeriesStatus = function(data) {

		TvService.updateTvSeries(data);
	};

	$scope.searchShows = function(keyword) {

		TvService.getQuerySeries(keyword);
		console.log(keyword);
		$scope.popularShow = TvService.getPopularSeries();
		console.log($scope.popularShow);	
		// TvService.reset();
	};
});