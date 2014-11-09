Protonet Hackathon - Skillexchange
===================================

A skill based Job searching platform prototype using Neo4j and angular.js

DB Nodes:

Employer {

	id (string, optional): UUID

	name (string, optional): Name of the Company

	created (integer, optional): Unix Time Created

	location (string, optional): Location of the Company

	sector (string, optional): Sector of the Company

	username (string, optional): Username

}

Position {

	id (string, optional): Unique position id

	title (string, optional): Job Title

	payment (string,optional): Job Payment

	timeframe (string, optional): Working Time

}

Skill {

	id (string, optional): UUID

	name (string, optional): Name of the Skill

}

Profile {

	id (string, optional): Unique Search ID

	title (string, optional): Title ofthe Jobsearch

	payment (string,optional): Job Payment

	timeframe (string, optional): Working Time

}

Person {

	id (string, optional): UUID

	created (string, optional): Unix Time Created

	username (string, optional): Username

}
