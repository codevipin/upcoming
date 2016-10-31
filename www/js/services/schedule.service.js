angular.module('conFusion')

.service('scheduleService', function($http, $rootScope) {

	var Service = {};

	Service.getSchedule = function(countryCode) {

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

	Service.getIndiaTvList = function() {

		var promise = $http ({

			method: 'GET',
			url: 'data/indiaTvList.json'
		});

		return promise;
	};

	Service.getIndiaChannelSchedule = function (data) {

		$rootScope.$broadcast('loading:show');

		var apiBaseUrl = 'http://indian-tv-schedule-api.appspot.com/schedule';

			var promise = $http({

				method: 'GET',
				url: apiBaseUrl,
				params: data,
				// withCredentials: true,
	        	headers: {
	                'Content-Type': 'application/json; charset=utf-8'
	        }
		});

		return promise;
	};

	return Service;
});