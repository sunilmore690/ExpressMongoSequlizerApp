//   let  dao = require("../dao/sequelize");
let model_name = "user";
let User = require("../dao/mongo").model(model_name);
let default_methods = require("./default")(User);
let UserModel = User.Model;
//connecting to mongo database
let authenticate = async (req, res, next) => {
  let user = req.body;
  //async/await approach
  /*try{
    let user = await dao.get(model_name, { email: user.email, password: user.password })
    if(!user){
        return next({ status: 422, message: "Email or password wrong" });
    }
    res.json(user)
  }catch(e){
    return next(e)
  }*/

  //promise approach
  User.get({ email: user.email, password: user.password })
    .then(function(user) {
      if (!user) {
        return next({ status: 422, message: "Email or password wrong" });
      }
      res.json(user);
    })
    .catch(function(e) {
      return next(e);
    });
};
//connecting to mysql datbase
module.exports = Object.assign(default_methods, {
  authenticate
});
