Nomie 1.0 Sync User Creator
=======================

Node.js command line tool for creating and securing a [Nomie](https://nomie.io) Sync Account on a remote CouchDB server.

One "feature" of CouchDB is that it's open by default. Meaning newly created databases are completely readable to the world. This script will create a new user, the users databases, and set the security so the user is the only one able to view the databases.

##Installation

```
git clone https://github.com/happydata/nsync-createuser.git
cd nsync-createuser
npm install
```

##Running

`node nomie-create-user.js`

![](http://snap.icorbin.com/Screen-Shot-2015-07-10-22-31-23/Screen-Shot-2015-07-10-22-31-23.png)
