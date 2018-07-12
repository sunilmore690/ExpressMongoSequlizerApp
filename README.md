# ExpressMongoSequlizerApp

**A sample  CRUD application with Node.js, Express , Mongodb & sequelize.**

## Requirements

* Node - 8.11.1
* Express - >4.*
* Mongoose - >5.2.2
* Sequelize - > 4.*

# Start Application

1. Make sure you've installed mongodb on your local machine
2. Run Following script

`
  git clone https://github.com/sunilmore690/ExpressMongoSequlizerApp.git
  cd ExpressMongoSequlizerApp
  npm install
  npm start



`

# Test Api

1. Add a new User
`
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"email":"scott@tiger.com","password":"xyz","name":"Scott Tiger"}' \
  http://localhost:3000/users
`

