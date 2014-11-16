

angular.module('myApp.register', ['ngRoute' , 'ngResource', 'nodes-services', 'myApp.candidate'])

.config(['$routeProvider',  function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl',[ 'skillService' ,'$scope', function( skillService, $scope) {

        $scope.data = {skills : skillService.getDbSkills()};
//        test

}]);