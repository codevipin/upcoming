angular.module('conFusion')

.controller('seasonEpisodeCtrl', function($scope, dish) {

	$scope.details = dish;

	console.log($scope.details);
});