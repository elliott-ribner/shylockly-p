## Structure

This project root contains nestjs server code, with a subfolder 'frontend' containing the client app.
The client app is built using webpack, and the resulting bundle, which lives in dist/, is served by the
nestjs server app. The nestjs server also provides the API endpoints used by the client app.

## Running

The following scripts should be run from the project root:

`npm run start-server:dev` will start the nestjs server on port 3000 (by default)
`npm run start-frontend:dev` will start webpack in watch mode to continuously build the frontend bundle as code changes

or

`npm run start:dev` will run both of these processes in parallel (using run-p) to enable easy local development

Navigate to localhost:3000 to use the app

NOTE: You may also run the webpack dev server from the 'frontend' folder if you want to build and run the frontend from
a development server (rather than the actual nestjs server). Note that this dev server does not build the bundle into
/dist like the webpack build command does. Additionally, to use the API endpoints, you'll still need to run the nest
server, and possible configure CORS to allow cross-origin requests.
