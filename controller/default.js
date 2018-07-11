let dao = require("../dao");
module.exports = function(model_name) {
  let create = function(req, res, next) {
    let body = req.body;
    dao.add(model_name, body, function(err, data) {
      if (err) return next(err);
      res.json(data);
    });
  };
  let index = function(req, res, next) {
    dao.getAll(model_name, req.query, function(err, users) {
      if (err) return next(err);
      res.json(users);
    });
  };
  let show = function(req, res, next) {
    dao.get(model_name, { _id: req.params.id }, function(err, user) {
      if (err) return next(err);
      res.json(user);
    });
  };
  let destroy = function(req, res, next) {
    dao.destory(dao, { _id: req.params.id }, function(err, result) {
      if (err) return next(err);
      res.json(result);
    });
  };
  let update = function(req, res, next) {
    delete req.body._id;
    dao.update(model_name, { _id: req.params.id }, req.body, function(
      err,
      user
    ) {
      if (err) return next(err);
      res.json(user);
    });
  };
  return {
    create,
    index,
    show,
    destroy,
    update
  };
};
