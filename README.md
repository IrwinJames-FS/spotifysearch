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
3. Add the following callback URI to your spotify application
```
http://localhost:3001/api/v1/auth/callback
```
4. Add an environment file to the root of /server (This may be moved to root of the project later on).
5. The .env file must contain the following keys
```
PORT=3001
CLIENT_ID=<spotify app id>
CLIENT_SECRET=<spotify app secret>
SESSION_SECRET=<some super duper secret record>
MONGO="mongodb://localhost:27017/spotifysearch"
```
6. Run Dev from root of the project
```
npm run dev
```





