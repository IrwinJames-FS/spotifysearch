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
MONGO="mongodb://localhost:27017/spotifysearch"
```
6. Run Dev from root of the project
```
npm run dev
```

## Important
**DO NOT USE http://localhost3000** The ui will load but authentication will not work. instead open http://localhost:3001 (A browser window should be opened automatically to this address)

## Known Issues

1. after long away times where a computer sleeps the timeout to refresh the token never fires. This should only occur if left to sleep for long periods. when the player becomes ready it will try to use the accessCode to play the current queue. 

2. I think this has been corrected but virtualization offsets on larger screens can create an offset which causes some of the populated cells to desync with the visible portion of the screen. 



