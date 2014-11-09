angular.module('nodes-services', ['ngResource']).factory('nodesService', [ '$resource', function ($resource) {
    var service = {

        array: [
            {"data": { "skill": "java"}
            }
        ]

	create_employer: function(name, location, sector, username){
	        var node = $resource('//localhost:7474/db/data/node/');
	        	var employer = node.get();
			employer.name = name;
			employer.location = location;
			employer.sector = sector;
			employer.username = username;
			employer.save();
	        });
	}


    };

    return service;

}]);
