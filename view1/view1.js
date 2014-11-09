'use strict';

angular.module('myApp.view1', ['ngRoute' , 'ngResource', 'nodes-services'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$resource', 'nodesService', function( $resource , nodesService) {
             var resource = $resource('//localhost:7474/db/data/node/1/relationships/all')
        var res = resource.query();
        console.log(res);




        var nodes = $resource('//localhost:7474/db/data/node/:nodeId' , {nodeId:'@id'});


        var node = nodes.get({nodeId: 1}, function (data) {
                console.log(data)
//            user.$save();
            });

}]);