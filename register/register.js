

angular.module('myApp.view1', ['ngRoute' , 'ngResource', 'nodes-services'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl', [  function( ) {

//        test

}]);