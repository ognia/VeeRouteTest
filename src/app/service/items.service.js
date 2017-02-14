export default class Items {
	constructor($http, $q) {
		'ngInject';
		let vm = this;

		vm._$http = $http;
		vm._$q    = $q;
	}

	query(file) {
  		let itemsList = require('./' + file);

		return itemsList;
	}
}
