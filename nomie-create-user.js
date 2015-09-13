console.log("#####################################################");
console.log("########  LETS CREATE A NOMIE SYNC ACCOUNT!  ########");
console.log("#####################################################");
var prompt = require("prompt");

/*****************************************************
* Add the Host and your Admin Username and Password
*
******************************************************/
var settings = {
	host: '', // couchdb url
	username: '', // couchdb admin user login
	password: '' //  couchdb admin user password
};

// Setup CouchDB
var CouchDB = require("couchdb-api");
var couchdb;

/*****************************************************
* Actions - currently only one. create-user
* actions['create-user'] will automatically be called for now.
******************************************************/
var actions = {
	'create-user': function () {
			// if(!isReady()) {
			// 	console.log("### ERROR ## Please provide a host, username and password in index.js");
			// 	return true;
			// }
			prompt.get([
			{
				name : 'couchurl',
				description : 'Couch URL https://url.com:5984',
				required : true
			},
			{
				name : 'adminuser',
				description : 'Admin Username',
				required : true
			},
			{
				name: 'adminpass',
				description : 'Admin Password',
				hidden: true,
			},
			{
				name: 'username',
				description : 'New Users Username',
				required: true
			}, {
				name: 'password',
				description : 'New Users Password',
				hidden: true,
				conform: function (value) {
					return true;
				}
			},
		{
			name: 'password2',
			description : 'Repeat Password',
			hidden: true,
			conform: function (value) {
				return true;
			}
		}
		], function (err, result) {
				/*****************************************************
				* Create the users with the information
				* provided by Prompt
				******************************************************/

				if(result.password != result.password2) {
					console.log("### ERROR ## Passwords do not match");
					setTimeout(function() {
						actions['create-user']();
					},500);
					return false;
				}

				couchdb = CouchDB.srv(result.couchurl);
				couchdb.auth = [result.adminuser, result.adminpass];

				createUser(result.username, result.password, function (err, data) {
					if (err) {
						console.log("### ERROR : User Creation Failed", err);
					} else {
						console.log("### User Created Successfully");

						createDatabase(result.username + '_trackers', result.username, function (err, data) {
							if (!err) {
								createDatabase(result.username + '_meta', result.username, function (err, data) {
									if (!err) {
										createDatabase(result.username + '_events', result.username, function (err, data) {
											if (!err) {
												console.log("### SUCCESS! User and their Databases have been created.");
												return true;
											} else {
												console.log("### ERROR : Creating Notes Database Failed", err);
												return true;
											}
										});
									} else {
										console.log("### ERROR : Creating Events Database Failed", err);
										return true;
									}
								});
							} else {
								console.log("### ERROR : Creating Trackers Database Failed", err);
								return true;
							}
						});
					}
				});
			});
		}, // End Create User
		'add-cors' : function() {

		}
};

var isReady = function() {
	if(settings.host && settings.username) {
		return true;
	} else {
		return false;
	}
};

/*****************************************************
* Create Couch Database with propert Security Settings
*
******************************************************/
var createDatabase = function (name, ownerUsername, callback) {
	var db = couchdb.db(name);
	console.log("### Creating database "+name);
	db.create(function (err, data) {
		if(!err) {
			console.log("### SUCCESS ## database "+name+" was created");
		}
		var security = {
			admins: {
				names: [ownerUsername],
				roles: []
			},
			members: {
				names: [ownerUsername],
				roles: []
			}
		};
		db.security(security, function (err, data) {
				callback(err, data);
		});

	});
};

/*****************************************************
* Create a User in CouchDB
*
******************************************************/
var createUser = function (username, password, callback) {
	couchdb.register(username, password, {
		createdBy: 'nsync-createuser',
		type: "user",
		"roles": []
	}, function (err, data) {
		if(err) {
			err.adminAuthFailed = true;
		}
		callback(err, data);
	});
};

/*****************************************************
* Autofire
*
******************************************************/
actions['create-user']();
