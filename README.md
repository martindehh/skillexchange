Protonet Hackathon - Skillexchange
===================================

A skill based Job searching platform prototype using Neo4j and angular.js

DB Objects:

Company {
	id (string, optional): UUID
	name (string, optional): Name of the Company
	created (integer, optional): Unix Time Created
	location (string, optional): Location of the Company
	sector (string, optional): Sector of the Company
	username (string, optional): Username
	password (string, optional): Password
}

Position {
	id (string, optional): Unique position id
	title (string, optional): Job Title
}

Skill {
	id (string, optional): UUID
	name (string, optional): Name of the Skill
}

Search {
	id (string, optional): Unique Search ID
	title (string, optional): Title ofthe Jobsearch
}

Person {
	id (string, optional): UUID
	created (string, optional): Unix Time Created
	username (string, optional): Username
	password (string, optional): Password
}
