class ListItemsCtrl {
	constructor(ItemsService, $scope, filterFilter) {
		let vm = this;

		vm._ItemsService = ItemsService;
		vm.itemsList     = vm._ItemsService.query('items-list-1.json');
		vm.filteredArray = vm._ItemsService.query('items-list-2.json');

		vm.sort = {};
		vm.sort.sortReverse  = false;
		vm.sort.propertyName = 'name';

		vm._filterFilter = filterFilter;

		/**
		 * drag-n-drop
		 * @param {object} data - element from array
		 * @param {number} index - index element from array
		 */
		$scope.dropSuccessHandler = ($event, array, data) => {
			let i = array.indexOf(data);
			array.splice(i, 1);
		};

		$scope.onDrop = (index, data, array) => {
			array.splice(index, 0, data);
		};
	}
	/*
	 arrFlags - array of parameters with which filtering
	 */
	filteredByFlags() {
		let vm  = this;
		let arrFlags = [];

		let filterItem = vm.filteredArray;

		angular.forEach(vm.filter, (value, key) => {
			if(vm.filter[key]) {
				arrFlags.push(key);
			}
		});

		if(!arrFlags.length) arrFlags = [''];

		for (var i = arrFlags.length - 1; i >= 0; i--) {
			filterItem = vm._filterFilter(filterItem, arrFlags[i]);
		}
		vm.filteredArray = filterItem;
	}

	showInfo(item) {
		let vm = this;
		let isSelectItem = angular.isUndefined(vm.selectItem);
		let sameItem     = (vm.selectItem === item);

		item.isActive = (isSelectItem || !sameItem) ? 'active' : false;

		if(!isSelectItem && !sameItem) {
			vm.selectItem.isActive = false;
		}

		if(sameItem) {
			item = {};
		}

		vm.selectItem = item;
	}
}

export default ListItemsCtrl;
