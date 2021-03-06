angular.module('conFusion')

.service('storageService', function() {

	var Service = {};

	Service.set = function(name, value) {

		localStorage.setItem(name, angular.toJson(value));
	};

	Service.get = function (name) {
		console.log(angular.fromJson(localStorage.getItem(name)))
		return angular.fromJson(localStorage.getItem(name));
	};

	Service.delete = function (name) {

		return localStorage.removeItem(name);
	};

	return Service;
})