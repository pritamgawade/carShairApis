The application code is developed using node.js, express. Unit tests are written using supertest and jest framework

Steps to run and test the Application:
1.Execute command 'npm install'
2.To start the application execute command 'npm start'
3.Access following URLs via Postman or any Rest client tool:
    a.To get all makes- http://localhost:3000/getAll
    b.To get all models based on make and modelyear - http://localhost:3000/getAllModels/make/Honda/modelyear/2002
    c.To get vehicle details based on VIN - http://localhost:3000/getDetails/3VWRF29M1XM114004

Steps to run the Unit tests:
-Execute command 'npm test'
