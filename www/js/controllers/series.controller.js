angular.module('conFusion')

.controller('seriesController', function($scope, tvService, storageService){

	var LocalStorage = storageService;

	var TvService = tvService;

	$scope.topRatedSeries = [];

    TvService.init();

    $scope.topRatedSeries = TvService.get();

    console.log($scope.topRatedSeries);

    $scope.toggleSeriesStatus = function (data) {

    	TvService.updateTvSeries(data);
    	// console.log(seriesId);
    	// $scope.toggleStatus = !$scope.toggleStatus;
    };
});