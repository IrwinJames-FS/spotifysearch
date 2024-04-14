# Spotify Search
Spotify Search is just a simple method application to allow for searching spotify.

## Setup
Currently this application is designed to work in a development environment. 

1. Clone the application to your computer.
2. Setup the project
	a. Install root dependencies and child dependencies
	```
	npm install
	npm run setup
	```
	b. Typescript should be listed as a local dependency on both projects however because I use a global install of typescript you may need to run **npm i typescript** but I do not believe this will be necessary.
3. Add an environment file to the root of /server (This may be moved to root of the project later on).
4. The .env file must contain the following keys
```
PORT=3001
CLIENT_ID=<spotify app id>
CLIENT_SECRET=<spotify app secret>
MONGO="mongodb://localhost:27017/spotifysearch"
```

## Known Issues. 
There appears to be an issue with the cookie being set properly the first login attempt. I am looking into this however clicking sign in again appears to set the credential properly. 


