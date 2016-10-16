angular.module('conFusion')

.service('tvService', function($resource, $http, showlistService, storageService) {

	var topRatedTvSeries = [];

	var storedShowList = [];

	var Service = {};

	var baseUrl = 'https://api.themoviedb.org/3/';

	var apiKey = '73becb75ca2d4bcd41ccbebc981b0e8c';

	var ShowListService = showlistService;

	var StorageService = storageService;

	Service.seriesDetail = {};

	Service.seasonDetails = {};

	Service.init = function() {

		console.log("Initialising tv service");

		Service.sync();

		ShowListService.init();
	};

	var modifySeriesList = function (originalList, storedList) {

	    for (var i=0; i<originalList.length; i++) {

	    	for (var j=0; j<storedList.length; j++) {

	    		if (storedList[j].id == originalList[i].id) {

	    			originalList[i].inShows = true;

	    			break;
	    		}

	    		else {

	    			originalList[i].inShows = false;
	    		}
	    	}

	    	topRatedTvSeries.push(originalList[i]);
	    }
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

		    getShowList = StorageService.get('showlist');

		    if (getShowList) {

		    	modifySeriesList(tvSeries, getShowList);
		    }

		    else {
		    	var dummyObj  = {

		    		id: 420
		    	};
		    	modifySeriesList(tvSeries,[dummyObj]);	
		    }

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

		})
		.then(function successCallback(response) {
		    
		    console.log(response);

		    Service.seasonDetails = response.data;

		  }, function errorCallback(response) {
			
			console.log("[Error Occured]: ", response);		    		
		});
	};

	Service.updateTvSeries = function (object) {

		var showlist = StorageService.get('showlist');

		var found = false;

		if (showlist) {

			for (var i=0; i<showlist.length; i++) {

				if (showlist[i].id == object.id) {

					console.log("remove it");

					storedShowList.splice(i,1);

					console.log(storedShowList);

					StorageService.set('showlist', storedShowList);

					var found = true;

					return;
				} 
			}	
		}

		if (!found) {

			console.log("[Object recieved]")

			storedShowList.push(object);

			StorageService.set('showlist', storedShowList);
		}
	};

	Service.reset = function () {

		topRatedTvSeries.length = 0;	
	};

	return Service;
});