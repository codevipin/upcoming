angular.module('conFusion')

.service('tvService', function($resource, $http, showlistService, storageService) {

	var topRatedTvSeries = [];

	// storeShowList = [];

	var Service = {};

	var baseUrl = 'https://api.themoviedb.org/3/';

	var apiKey = '73becb75ca2d4bcd41ccbebc981b0e8c';

	var ShowListService = showlistService;

	var StorageService = storageService;

	console.log(showlistService);

	Service.seriesDetail = {};

	Service.seasonDetails = {};

	Service.init = function() {

		console.log("Initialising tv service");

		Service.sync();

		ShowListService.init();
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

		    var getShowList = ShowListService.showList;

		    console.log(tvSeries);

		    for (var i=0; i<tvSeries.length; i++) {

		    	for (var j=0; j<getShowList.length; j++) {

		    		if (getShowList[j].id == tvSeries[i].id) {
console.log("id matched", getShowList[j].id);
		    			tvSeries[i].inShows = true;
		    			break;
		    		}

		    		else {

		    			tvSeries[i].inShows = false;
		    		}
		    	}
		    	topRatedTvSeries.push(tvSeries[i]);

		    	// if (i<3) {

		    	// 	storeShowList.push(tvSeries[i]);
		    	// }

		    	// StorageService.set('showlist',storeShowList);
		    }

		    // Service.getSeriesDetails(19885);

		  }, function errorCallback(response) {
			
			console.log("[Error Occured]: ", response);		    		
		  });
	};

	Service.get =function() { 

		return topRatedTvSeries;
	};

	Service.getSeriesDetails = function(seriesId) {

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
	};

	Service.getSeriesEpisodes = function (seriesId, seasonId) {

		var apiUrl = baseUrl + 'tv/' + seriesId + '/season/' + seasonId + '?api_key=' + apiKey;

		$http({

		  method: 'GET',
		  url: apiUrl

		}).then(function successCallback(response) {
		    
		    console.log(response);

		    Service.seasonDetails = response.data;

		  }, function errorCallback(response) {
			
			console.log("[Error Occured]: ", response);		    		
		  });
	}

	return Service;
});