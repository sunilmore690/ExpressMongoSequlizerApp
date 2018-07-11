let dao = require("../dao/mongo");
let model_name = 'user';
let default_methods = require("./default")(model_name);
let authenticate = (req, res, next) => {
  let user = req.body;
  dao.get(
    model_name,
    { email: user.email, password: user.password },
    null,
    function(err, user) {
      if (err) return next(err);
      else if (!user) {
        return next({ status: 422, message: "Email or password wrong" });
      }
      res.json(user);
    }
  );
};
module.exports = Object.assign(default_methods, {
  authenticate
});
