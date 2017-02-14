import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import ItemsService from './items.service';
servicesModule.service('ItemsService', ItemsService);


export default servicesModule;
