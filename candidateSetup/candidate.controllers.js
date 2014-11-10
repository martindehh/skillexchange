


angular.module('myApp.candidate', ['ngRoute' , 'ngResource', 'nodes-services'])

.config(['$routeProvider',  function( $routeProvider   ) {


  $routeProvider.when('/candidate', {
    templateUrl: 'candidateSetup/candidate.html',
    controller: 'CandidateSetupCtrl'
  });
}])

.controller('CandidateSetupCtrl', [  function( ) {




}]);