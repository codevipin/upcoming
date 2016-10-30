angular.module('conFusion')

.controller('scheduleCtrl', function($scope, scheduleService, storageService, $ionicModal, $timeout) {

	var ScheduleService = scheduleService;

	var countryCode = storageService.get('countryCode');

	$scope.country = {

		code : null
	};

	// var countryCode = 'GB';

	$scope.countryCode = countryCode;

	var openModel = function() {

		$ionicModal.fromTemplateUrl('templates/select-country.html', {
		scope: $scope
		})
		.then(function(modal) {
			$scope.modal = modal;

			$scope.modal.show();
		});
	};

	var getCountryCode = function() {

		ScheduleService.getCountryCode()
		.success( function(response) {

			console.log(response);
			$scope.countryList = response;
		})
		.error (function(response) {

			console.log(response);
		});
	};

	var getSchedule = function(countryCode) {

		ScheduleService.getSchedule(countryCode)

		.success( function(response) {

			console.log(response);

			$scope.schedule = response;
		})
		.error( function(response) {

			console.log(response);
		})
	};

	if (countryCode) {

		console.log("Cannot find country code");
		getSchedule(countryCode);
	}

	else {

		console.log("Ask user to enter Country Code");
		getCountryCode();
		openModel();
	}

	$scope.closeCountryModal = function() {

		console.log($scope.country.code);

		storageService.set('countryCode', $scope.country.code);

		// $scope.countryCode = $scope.country.code;

		getSchedule($scope.country.code);

		$scope.modal.hide();
	};


	// $timeout(function() {

	// 	$scope.modal.show();
	// });


});