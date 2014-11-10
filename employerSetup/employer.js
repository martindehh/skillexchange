


angular.module('myApp.employer', ['ngRoute' , 'ngResource', 'nodes-services'])

.config(['$routeProvider',  function( $routeProvider   ) {


  $routeProvider.when('/employer', {
    templateUrl: 'employerSetup/employer.html',
    controller: 'EmployerSetupCtrl'
  });
}])

.controller('EmployerSetupCtrl', [  function( ) {




}]);