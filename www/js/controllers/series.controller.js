angular.module('conFusion')

.controller('seriesController', function($scope, tvService, storageService){

	$scope.toggleStatus = true;

	var LocalStorage = storageService;

	var TvService = tvService;

	$scope.topRatedSeries = [];

        TvService.init();

        $scope.topRatedSeries = TvService.get();

        console.log($scope.topRatedSeries);

        $scope.isFavoutite = function (seriesId) {

        	if (seriesId == 37636) {

        		return true;
        	}

        	else {

        		return false;
        	} 
        		
        };

        $scope.toggleSeriesStatus = function (seriesId) {

        	console.log(seriesId);
        	$scope.toggleStatus = !$scope.toggleStatus;
        } ;
});