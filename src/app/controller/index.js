import angular from 'angular';

let appControllers = angular.module('app.controllers', []);

import ListItemsCtrl from './list-items';
appControllers.controller('ListItemsCtrl', ListItemsCtrl);

export default appControllers;
