angular.module('nodes-services', ['ngResource']).factory('nodesService', [ '$resource', function ($resource) {
    var service = {

        array: [
            {"data": { "skill": "java"}
            }
        ],

	create_employer: function(name, location, sector, username) {
		var node = $resource('//localhost:7474/db/data/node/');
	        var employer = node.get();
		employer.name = name;
		employer.location = location;
		employer.sector = sector;
		employer.username = username;
		employer.created = new Date().getTime();
		employer.$save();
	},
	create_position: function(title, payment, timeframe) {
		var node = $resource('//localhost:7474/db/data/node/');
		var position = node.get();
		position.title = title;
		position.payment = payment;
		position.timeframe = timeframe;
		position.$save();
	},
	create_skill: function(name) {
		var node = $resource('//localhost:7474/db/data/node/');
		var skill = node.get();
		skill.name = name;
		skill.$save();
	},
	create_profile: function(title, payment, timeframe) {
		var node = $resource('//localhost:7474/db/data/node/');
		var profile = node.get();
		profile.title = title;
		profile.payment = payment;
		profile.timeframe = timeframe;
		profile.$save();
	},
	create_person: function(username) {
		var node = $resource('//localhost:7474/db/data/node/');
		var person = node.get();
		person.username = username;
		person.created = new Date().getTime();
		person.$save();
	},
	connect_employer_has_position: function(employer_id, position_id) {
		var employer_node = $resource('//localhost:7474/db/data/node/:employer_id', {employer_id:'@employer_id'});
		var position_node = $resource('//localhost:7474/db/data/node/:position_id', {position_id:'@position_id'});
		var node = $resource('//localhost:7474/db/data/node/');
		var employer = employer_node.$get();
		var position = position_node.$get();
		var connection = node.get();
		connection.start = employer.id;
		connection.end = position.id;
		connection.type = 'HAS';
		connection.$save();	
	},
	connect_position_musthave_skill: function(position_id, skill_id, weight) {
                var position_node = $resource('//localhost:7474/db/data/node/:position_id', {position_id:'@position_id'});
		var skill_node = $resource('//localhost:7474/db/data/node/:skill_id', {skill_id:'@skill_id'});
                var node = $resource('//localhost:7474/db/data/node/');
                var position = position_node.$get();
		var skill = skill_node.$get();
                var connection = node.get();
                connection.start = position.id;
                connection.end = skill.id;
                connection.type = 'MUST HAVE';
		connection.weight = [{"data": { "weight": weight }}];
                connection.$save();
	},
	connect_position_need_skill:function(position_id, skill_id, weight) {
                var position_node = $resource('//localhost:7474/db/data/node/:position_id', {position_id:'@position_id'});
                var skill_node = $resource('//localhost:7474/db/data/node/:skill_id', {skill_id:'@skill_id'});
                var node = $resource('//localhost:7474/db/data/node/');
                var position = position_node.$get();
                var skill = skill_node.$get();
                var connection = node.get();
                connection.start = position.id;
                connection.end = skill.id;
                connection.type = 'NEED';
                connection.weight = [{"data": { "weight": weight }}];
                connection.$save();
        },
	connect_position_optional_skill:function(position_id, skill_id, weight) {
                var position_node = $resource('//localhost:7474/db/data/node/:position_id', {position_id:'@position_id'});
                var skill_node = $resource('//localhost:7474/db/data/node/:skill_id', {skill_id:'@skill_id'});
                var node = $resource('//localhost:7474/db/data/node/');
                var position = position_node.$get();
                var skill = skill_node.$get();
                var connection = node.get();
                connection.start = position.id;
                connection.end = skill.id;
                connection.type = 'OPTIONAL';
                connection.weight = [{"data": { "weight": weight }}];
                connection.$save();
        },
	connect_position_has_skill:function(position_id, skill_id, weight) {
                var position_node = $resource('//localhost:7474/db/data/node/:position_id', {position_id:'@position_id'});
                var skill_node = $resource('//localhost:7474/db/data/node/:skill_id', {skill_id:'@skill_id'});
                var node = $resource('//localhost:7474/db/data/node/');
                var position = position_node.$get();
                var skill = skill_node.$get();
                var connection = node.get();
                connection.start = position.id;
                connection.end = skill.id;
                connection.type = 'HAS';
                connection.weight = [{"data": { "weight": weight }}];
                connection.$save();
        },
	connect_person_has_profile:function(person_id, profile_id) {
		var person_node = $resource('//localhost:7474/db/data/node/:person_id', {person_id:'@person_id'});
                var profile_node = $resource('//localhost:7474/db/data/node/:profile_id', {profile_id:'@profile_id'});
                var node = $resource('//localhost:7474/db/data/node/');
                var person = person_node.$get();
                var profile = profile_node.$get();
                var connection = node.get();
                connection.start = person.id;
                connection.end = profile.id;
                connection.type = 'HAS';
                connection.$save();
	},
	connect_profile_has_skill:function(profile_id, skill_id, weight){
		var profile_node = $resource('//localhost:7474/db/data/node/:profile_id', {profile_id:'@profile_id'});
		var skill_node = $resource('//localhost:7474/db/data/node/:skill_id', {skill_id:'@skill_id'});
		var node = $resource('//localhost:7474/db/data/node/');
		var profile = profile_node.$get();
		var skill = skill_node.$get();
		var connection = node.get();
		connection.start = profile.id;
                connection.end = skill.id;
                connection.type = 'HAS';
		connection.weight = [{"data": { "weight": weight }}];
                connection.$save();
	},
	
    };

    return service;

}]);
