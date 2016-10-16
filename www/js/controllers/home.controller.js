angular.module('conFusion')

.controller('homeCtrl', function($scope, storageService) {

	$scope.message="Loading ...";

	$scope.storedShowsList = storageService.get('showlist');
	console.log($scope.storedShowsList);
});