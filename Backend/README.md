
**Backend Service**

-stack
	-- hapi.js
	-- postgrestql
	-- sequelize (ORM)
	-- bcrypt
	-- jsonwebtoken

How to use

- npm install
- change .env for api API_PREFIX 
- change config/config.json for database and key elevenia
		
- databse migration
	- migration database 
	```bash
		npm run migrate
	```
	- seed data from elevenia api 
	```bash
		npm run seed:dev
	```
- if database migrate and seed success, now you can run service
	 ```bash
	 npm start
	```
- undo your database migration note: initial data will be lost
 - undo migration  (will remove your table)
	
	```bash
	npm run migrate:undo
	```
- undo seed  (will remove your record of table)
	```bash
	npm run seed:undo
	```
document API use import postman file jubelio-BE-hapi.postman_collection.json 
