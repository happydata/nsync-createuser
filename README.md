Nomie 1.0 Sync Setup
=======================

[Nomie](https://nomie.io) allows you to track, compare and understand virtually any aspect of your life - with a single press of a button. While Nomie is offline (no central server) it does support syncing with a remote CouchDB server.

## Step 1. Install / Setup CouchDB

1. [Install CouchDB](https://www.digitalocean.com/community/tutorials/how-to-install-couchdb-and-futon-on-ubuntu-14-04), or use a Hosted service like [IrisCouch](http://iriscouch.com)
2. Setup an Admin User - once your CouchDB is setup in IrisCouch, click "Add Admin User" in the lower right hand corner.

## Step 2. Enable CORS
You'll need to enable CORS (Cross Origin Resource Sharing) on your CouchDB before will accept allow syncing from your Nomie App.

```
npm install -g add-cors-to-couchdb
add-cors-to-couchdb http://me.iriscouch.com -u myadminuser -p myadminpass
```

## Step 3. Add a Nomie Sync User

```
git clone https://github.com/happydata/nsync-createuser.git
cd nsync-createuser
npm install
node nomie-create-user.js
```

- Provide your Couch DB URL. `https://example.iriscouch.com:6984`
- Provide the Couch admin username and password
- Set the username and password of a new nomie sync user

![](http://snap.icorbin.com/Screen-Shot-2015-09-12-21-40-32.png)
