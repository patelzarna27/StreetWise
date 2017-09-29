# StreetWise

## Overview

StreetWise is a web and mobile app where people can report street harassment incidents and also view street harassment incidents in their area.

The application uses [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) on the back end, and the [Materialize](http://materializecss.com/getting-started.html) CSS framework and [jQuery](https://jquery.com) on the front end.

## Demo
	
StreetWise is deployed to [Heroku](https://streetwiseapp.herokuapp.com/).

## Installation

To install the application follow the instructions below:

	git clone https://github.com/claire181/StreetWise.git
	cd StreetWise
	npm install
	
## Running Locally

To run the application locally and access it in your browser, first set the `PORT` environment variable to the value of your choice. An example is shown below.

	export PORT=3000
	
After the `PORT` environment variable has been set, run the Node.js application with the command below.

	node server.js
	
The application will now be running locally on `PORT`, in this case that is port 3000. You can then access it locally from your browser at the URL `localhost:PORT`, in this case `localhost:3000`.