Please set/create the database then run the command sequelize-cli db:migrate --env=local on the command line
Database: mysql
Database Name: db_todo

To run the application:
Please install nodemon and type to command line npm run start or if not just type on the command line node index.js


Links:
https://www.npmjs.com/package/nodemon

*Dependencies*

npm install express
npm install dotenv --save
npm install cors
npm install body-parser
npm install date-fns
npm install date-fns-tz
npm install mysql2
npm install sequelize --save
npm install jest -g
npm install supertest --g

*First Use/Install Sequelize*
sequelize init

*Sequelize Command*
Create Model:
sequelize model:generate --name user --attributes firstname:string,lastname:string,mi:string,name:string,email:string,password:string,role_id:integer,date_activated:date,created_by:integer,status:boolean,deletedAt:date
