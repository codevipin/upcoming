angular.module('conFusion')

.controller('seasonEpisodeCtrl', function($scope, dish) {

	console.log("season episode controller");

	$scope.details = dish;

	console.log($scope.details);
});