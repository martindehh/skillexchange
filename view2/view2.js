'use strict';

angular.module('myApp.view2', ['ngRoute', 'nodes-services'])

.config(['$routeProvider',  function($routeProvider ) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl',['nodesService' ,function(nodesService) {
        nodesService.create_employer('google', 'Hamburg', 'world domination', 'Google HR')

}]);