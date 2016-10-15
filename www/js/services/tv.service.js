angular.module('conFusion')

.service('tvService',['$resource', '$http', function($resource, $http) {

	var topRatedTvSeries = [];

	var Service = {};

	var baseUrl = 'https://api.themoviedb.org/3/';

	var apiKey = '73becb75ca2d4bcd41ccbebc981b0e8c';

	Service.seriesDetail = {};

	Service.init = function() {

		console.log("Initialising tv service");

		Service.sync();
	};

	Service.sync = function() {
		var apiUrl = baseUrl + 'tv/top_rated?api_key=' + apiKey;
		
		$http({

		  method: 'GET',
		  url: 'http://localhost:3004/results'

		}).then(function successCallback(response) {
		    
		    console.log(response);

		    // tvSeries = response.data.results;
		    tvSeries = response.data; 

		    for (var i=0; i<tvSeries.length; i++) {

		    	topRatedTvSeries.push(tvSeries[i]);
		    }

		    // Service.getSeriesDetails(19885);

		  }, function errorCallback(response) {
			
			console.log("[Error Occured]: ", response);		    		
		  });
		  
		// $resource('http://localhost:3004/results:id')
		// .query()
		// .$promise
		// .then(function successCallback(response) {
		    
		//     console.log(response);

		//     // tvSeries = response.data.results;
		//     tvSeries = response; 

		//     for (var i=0; i<tvSeries.length; i++) {

		//     	topRatedTvSeries.push(tvSeries[i]);
		//     }

		//   }, function errorCallback(response) {
			
		// 	console.log("[Error Occured]: ", response);		    		
		//   });
		  
		

		// console.log(topRatedSeries);
	};

	Service.get =function() { 

		return topRatedTvSeries;
	};

	Service.getSeriesDetails = function(seriesId) {
console.log("series detail called")
		var apiUrl = baseUrl + 'tv/' + seriesId + '?api_key=' + apiKey;

		$http({

		  method: 'GET',
		  url: apiUrl

		}).then(function successCallback(response) {
		    
		    console.log(response);

		    Service.seriesDetail = response.data;

		  }, function errorCallback(response) {
			
			console.log("[Error Occured]: ", response);		    		
		  });
	}

	return Service;
}]);