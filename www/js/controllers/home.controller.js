angular.module('conFusion')

.controller('homeCtrl', function($scope, storageService, savedShowList) {

	$scope.message="Loading ...";

	$scope.storedShowsList = savedShowList;
});