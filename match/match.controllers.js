(function () {


    angular.module('match.controllers', []).controller('MatchCtrl', ['$http','$scope', function ($http, $scope) {

        var query = { "statements" : [ { "statement": " match (p:Profile) -[:HAS_SKILL]-(s)-[:WANTS_SKILL]-(u) return p as CandidateProfile, s as Skill , u as Search;" } ] }

        var result = $http.post('http://localhost:7474/db/data/transaction/commit', query);
        result.success(function (data) {
            console.log(data.results[0]);

            $scope.match = data.results[0];
        });

    }]);

})()