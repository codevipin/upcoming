angular.module('conFusion')

.service('scheduleService', function($http) {

	var Service = {};

	Service.getSchedule = function(countryCode) {

		console.log("Fetching the TV Schedule");

		var scheduleAPI = 'http://api.tvmaze.com/schedule?country=' + countryCode;
		var promise = $http({

			method: 'GET',
			url: scheduleAPI
		});

		return promise;
	};

	Service.getCountryCode = function() {

		var promise = $http ({

			method: 'GET',
			url: 'data/country-code.json'
		});

		return promise;
	};

	return Service;
});