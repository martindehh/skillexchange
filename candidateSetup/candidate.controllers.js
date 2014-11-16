angular.module('myApp.candidate', ['ngRoute' , 'ngResource', 'nodes-services'])

    .config(['$routeProvider', function ($routeProvider) {


        $routeProvider.when('/candidate', {
            templateUrl: 'candidateSetup/candidate.html',
            controller: 'CandidateSetupCtrl'
        });
    }])
    .factory(
    'skillService', ['$resource', function ($resource) {

        var service = {
            skills: [
//                {id: 'test',
//                    'name': 'coden'
//
//                }
            ],

            getDbSkills: function () {
                Skills = $resource(' http://localhost:7474/db/data/label/Skill/nodes');
                return Skills.query();

            },
            get: function () {


                return this.skills;
            },
            add: function (skill) {
                for (var i = 0; i< this.skills.length; i++){
                    if (this.skills[i].name === skill.name){
                        alert('Skill already in your list');
                        return;
                    }
                }
                this.skills.push(skill);
            }
        };
        return service;
    }])
    .controller("CandidateSetupCtrl", ['$scope', 'skillService', 'nodesService', '$q', function ($scope, skillService, nodesService, $q) {



        $scope.dbSkills = [];
        skillService.getDbSkills().$promise.then(function (nodes) {


            for (var i = 0; i < nodes.length; i++) {

                $scope.dbSkills.push(nodes[i].data.name);
            }


        });


        $scope.user = {email: ''};
        $scope.profile = {
            title: 'unnamed',
            payment: 0,
            timeframe: 40
        };

        $scope.data = {
            skills: skillService.get(),
            newSkill: {},

        };
        $scope.rating = {
            rate: 0,
            max: 5,
            min: 0
        };

        $scope.add = function (skill) {
            skillService.add(angular.copy(skill));
        };

        $scope.submit = function () {


            var person = nodesService.createPerson($scope.user.email)
            var profile = nodesService.createProfile($scope.profile)

            var skillsPromises = [];
            var skills = [];


//                console.log($scope.data.skills[i]);


            // wait until profile and person created
            $q.all([person.$promise, profile.$promise]).then(function (result) {

                nodesService._createRelationship('HAS_PROFILE', person.metadata.id, profile.metadata.id);

                for (var i = 0; i < $scope.data.skills.length; i++) {


                    skillPromise = (nodesService.createSkill($scope.data.skills[i]));

                    skillPromise.then(function (skillNode) {

                        console.log('result', skillNode);

                        nodesService._createRelationship('HAS_SKILL', profile.metadata.id, skillNode.metadata.id );
                    });
                }

            }, function () {

                // call when either promise1 or promise 2 is rejected
                alert('person or profile could not be created');
            });


        };

    }])
;


