import angular from 'angular';
import 'angular-native-dragdrop';

import './controller/';
import './service/';

import 'font-awesome/scss/font-awesome.scss';
import '../style/app.scss';

const MODULE_NAME = 'app';

const REQUIRES = [
	'ang-drag-drop',
	'app.controllers',
	'app.services'
];

angular.module(MODULE_NAME, REQUIRES);

export default MODULE_NAME;
