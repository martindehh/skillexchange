angular.module('nodes-services', ['ngResource']).factory('nodesService', [ '$resource', '$q', function ($resource, $q) {
    var service = {

        array: [
            {"data": { "skill": "java"}
            }
        ],

        create_employer: function (name, location, sector, username) {
            var node = $resource('//localhost:7474/db/data/node/');
            var employer = node.get();
            employer.name = name;
            employer.location = location;
            employer.sector = sector;
            employer.username = username;
            employer.created = new Date().getTime();
            employer.$save();
        },
        create_position: function (title, payment, timeframe) {
            var node = $resource('//localhost:7474/db/data/node/');
            var position = node.get();
            position.title = title;
            position.payment = payment;
            position.timeframe = timeframe;
            position.$save();
        },

        createSkill: function (skillData) {
//            console.log('retrieving: ', skillData.name);

            var existingSkill = this.retrieveSkill(skillData.name);
            console.log('retrieving: ', existingSkill);

            var deferred = $q.defer();
            promise = deferred.promise;

            existingSkill.$promise.then(angular.bind(this, function () {


                console.log('retrieving length: ', existingSkill.length);
                if (existingSkill.length) {
                    console.log('first skill', existingSkill[0]);

                    deferred.resolve(existingSkill[0]);
                }

                else {
                    this._createNodeWithLabel(skillData, "Skill").$promise.then(function (data) {


                        deferred.resolve(data);
                    });
                }

            }));


            return promise;
        },

        createProfile: function (profileData) {
            return this._createNodeWithLabel(profileData, "Profile");

        },

        createSearch: function(profileData){

            return this._createNodeWithLabel(profileData, "Search");

        },


        _createNodeWithLabel: function (postData, labelString) {
            var Nodes = $resource('//localhost:7474/db/data/node/');

            return Nodes.save(postData, function (newNodeResource) {
                var Labels = $resource('//localhost:7474/db/data/node/:nodeId/labels/', {nodeId: newNodeResource.metadata.id});
                Labels.save([labelString]);
            });
        },

        _createRelationship: function (type, fromId, toId) {
            postData = { "to": "http://localhost:7474/db/data/node/" + toId,
                "type": type};


            var Nodes = $resource('//localhost:7474/db/data/node/:nodeId/relationships', {nodeId: fromId});

            return Nodes.save(postData);
        },
        createPerson: function (username) {
            return this._createNodeWithLabel({username: username}, "Person");


        },

        retrieveSkill: function (skillName) {
            query = {

                labelName: "Skill",
                property: "name",
                value: skillName};
            return   this._retrieveNode(query);

        },

        _retrieveNode: function (query) {


//            var Nodes = $resource('//localhost:7474/db/data/label/Skill/nodes?name=%22Clint+Eastwood%22')
            var Nodes = $resource('//localhost:7474/db/data/label/:labelName/nodes?:property=%22:value%22', {

//            var Nodes = $resource('//localhost:7474/db/data/label/:labelName/nodes?:property', {
                labelName: '@label',
                property: '@property',
                value: '@value'
            });
            return Nodes.query(query, function (data) {
//                console.log('data', data);
            });


        },

        connect_employer_has_position: function (employer_id, position_id) {
            var employer_node = $resource('//localhost:7474/db/data/node/:employer_id', {employer_id: '@employer_id'});
            var position_node = $resource('//localhost:7474/db/data/node/:position_id', {position_id: '@position_id'});
            var node = $resource('//localhost:7474/db/data/node/');
            var employer = employer_node.$get();
            var position = position_node.$get();
            var connection = node.get();
            connection.start = employer.id;
            connection.end = position.id;
            connection.type = 'HAS';
            connection.$save();
        },
        connect_position_musthave_skill: function (position_id, skill_id, weight) {
            var position_node = $resource('//localhost:7474/db/data/node/:position_id', {position_id: '@position_id'});
            var skill_node = $resource('//localhost:7474/db/data/node/:skill_id', {skill_id: '@skill_id'});
            var node = $resource('//localhost:7474/db/data/node/');
            var position = position_node.$get();
            var skill = skill_node.$get();
            var connection = node.get();
            connection.start = position.id;
            connection.end = skill.id;
            connection.type = 'MUST HAVE';
            connection.weight = [
                {"data": { "weight": weight }}
            ];
            connection.$save();
        },
        connect_position_need_skill: function (position_id, skill_id, weight) {
            var position_node = $resource('//localhost:7474/db/data/node/:position_id', {position_id: '@position_id'});
            var skill_node = $resource('//localhost:7474/db/data/node/:skill_id', {skill_id: '@skill_id'});
            var node = $resource('//localhost:7474/db/data/node/');
            var position = position_node.$get();
            var skill = skill_node.$get();
            var connection = node.get();
            connection.start = position.id;
            connection.end = skill.id;
            connection.type = 'NEED';
            connection.weight = [
                {"data": { "weight": weight }}
            ];
            connection.$save();
        },
        connect_position_optional_skill: function (position_id, skill_id, weight) {
            var position_node = $resource('//localhost:7474/db/data/node/:position_id', {position_id: '@position_id'});
            var skill_node = $resource('//localhost:7474/db/data/node/:skill_id', {skill_id: '@skill_id'});
            var node = $resource('//localhost:7474/db/data/node/');
            var position = position_node.$get();
            var skill = skill_node.$get();
            var connection = node.get();
            connection.start = position.id;
            connection.end = skill.id;
            connection.type = 'OPTIONAL';
            connection.weight = [
                {"data": { "weight": weight }}
            ];
            connection.$save();
        },
        connect_position_has_skill: function (position_id, skill_id, weight) {
            var position_node = $resource('//localhost:7474/db/data/node/:position_id', {position_id: '@position_id'});
            var skill_node = $resource('//localhost:7474/db/data/node/:skill_id', {skill_id: '@skill_id'});
            var node = $resource('//localhost:7474/db/data/node/');
            var position = position_node.$get();
            var skill = skill_node.$get();
            var connection = node.get();
            connection.start = position.id;
            connection.end = skill.id;
            connection.type = 'HAS';
            connection.weight = [
                {"data": { "weight": weight }}
            ];
            connection.$save();
        },

        _createConnection: function () {

        },
        connectPersonWithProfile: function () {
////            var person_node = $resource('//localhost:7474/db/data/node/:person_id', {person_id: '@person_id'});
//            var person_node = $resource('//localhost:7474/db/data/node/:person_id', {person_id: 147});
////            var profile_node = $resource('//localhost:7474/db/data/node/:profile_id', {profile_id: '@profile_id'});
//            var profile_node = $resource('//localhost:7474/db/data/node/:profile_id', {profile_id: 19});
//
//            var person = person_node.get();
//            var profile = profile_node.get();
//            console.log(person);
//            console.log(profile);
//
//            var Node = $resource('//localhost:7474/db/data/node/');
//
//            connection.start = person.id;
//            connection.end = profile.id;
//            connection.type = 'HAS';
//            connection.$save();


        },
        connect_person_has_profile: function (person_id, profile_id) {
            var person_node = $resource('//localhost:7474/db/data/node/:person_id', {person_id: '@person_id'});
            var profile_node = $resource('//localhost:7474/db/data/node/:profile_id', {profile_id: '@profile_id'});

            var node = $resource('//localhost:7474/db/data/node/');

            var person = person_node.$get();
            var profile = profile_node.$get();

            var connection = node.get();
            connection.start = person.id;
            connection.end = profile.id;
            connection.type = 'HAS';
            connection.$save();
        },
        connect_profile_has_skill: function (profile_id, skill_id, weight) {
            var profile_node = $resource('//localhost:7474/db/data/node/:profile_id', {profile_id: '@profile_id'});
            var skill_node = $resource('//localhost:7474/db/data/node/:skill_id', {skill_id: '@skill_id'});
            var node = $resource('//localhost:7474/db/data/node/');
            var profile = profile_node.$get();
            var skill = skill_node.$get();
            var connection = node.get();
            connection.start = profile.id;
            connection.end = skill.id;
            connection.type = 'HAS';
            connection.weight = [
                {"data": { "weight": weight }}
            ];
            connection.$save();
        },

    };

    return service;

}
])
;
