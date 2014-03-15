'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('uniGroupApp', [
  'ngRoute'
]).
config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
  $locationProvider.html5Mode(false);
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/tasks', {templateUrl: 'partials/tasks.html', controller: 'TasksCtrl'});
  $routeProvider.when('/groups', {templateUrl: 'partials/groups.html', controller: 'GroupCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);