angular.module('nodes-services', ['ngResource']).factory('nodesService', [ '$resource', function ($resource) {
    var service = {

        array: [
            {"data": { "skill": "java"}
            }
        ]


    };

    return service;

}]);