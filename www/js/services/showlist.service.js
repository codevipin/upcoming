angular.module('conFusion')

.service('showlistService', function(storageService) {

	var Service = {};

	var LocalStorage = storageService;

	Service.showList = {};

	Service.init = function () {

		Service.getShowList();
	};

	Service.getShowList = function () {

		var showlist = LocalStorage.get('showlist');

		Service.showList = showlist;
	};

	Service.getFavShowList = function () {

		console.log("[GET] favourite seasons");
	};

	return Service;
});