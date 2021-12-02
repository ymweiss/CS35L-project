To be able to run this code use the following install commands in the given directories:

/express-static-serve/react-app/server:

	npm install express

	npm install mysql

	npm install cors

	npm install body-parser

/express-static-serve/react-app:

	npm install react
	
	npm install axios
	
	npm install react-dom
	
	npm install react-router-dom
	
	npm install scheduler
	
	yarn add babel-eslint
	
	npm install react-bootstrap
	
	
Then, go to /express-static-serve/react-app/server/index.js:

	In this file, change the password in line 12 to the correct password for your mysql database connection.
	
	
To run the app, open 2 terminals. In the first one, run the client by running the command: 'npm start' in /express-static-serve/react-app.

In the other terminal, run 'npm run serve' from /express-static-serve/react-app/server.


A sql script (shop_app_create.sql) is provided in /express-static-serve/react-app/src/db. Open it in your connection on Workbench and execute it to create all the tables necessary for the app. You can use Workbench to manually insert values into the tables.
	
