(function () {


    angular.module('match', ['match.controllers']).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/match', {
    templateUrl: 'match/match.tpl.html',
    controller: 'MatchCtrl'
  });
}])



})()