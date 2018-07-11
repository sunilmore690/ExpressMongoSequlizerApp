let cbFunction = function() {};

class Dao {
  constructor({
    db: { dialect, datbase_name, user, password, host, port },
    modelsPath
  }) {
    this.modelPath = modelsPath;
    this.connectionString = connectionString;
    this.sequelize = require("./sequelize")({
      dialect,
      datbase_name,
      user,
      password,
      host,
      port
    });
    this.models = require("./models_init")(this.sequelize, modelsPath);
    mongoose.set("debug", debug);
  }
  add(model_name, data, cb) {
    this.model = this.models[model_name];
    console.log(this.model);
    if (typeof cb != "function") cb = cbFunction;
    let model = new this.model(data);
    model.save(function(err, obj) {
      if (err) return cb(err);
      cb(null, obj);
    });
  }
  get(model_name, params, project, cb) {
    this.model = this.models[model_name];
    params = params || {};
    if (typeof cb != "function") cb = cbFunction;
    let query = this.model.findOne({ where: params }, project);
    query
      .then(function(data) {
        return cb(null, data);
      })
      .catch(function(err) {
        return cb(err);
      });
  }
  getAll(model_name, params, project, cb) {
    this.model = this.models[model_name];
    params = params || {};
    if (typeof cb != "function") cb = cbFunction;
    let query = this.model.find(params, project);
    query.exec(function(err, data) {
      if (err) return cb(err);
      return cb(null, data);
    });
  }
  destory(model_name, params, cb) {
    this.model = this.models[model_name];
    params = params || {};
    if (typeof cb != "function") cb = cbFunction;
    let query = this.model.remove(params);
    query.exec(function(err, data) {
      if (err) return cb(err);
      return cb(null, data);
    });
  }
  update(model_name, params, data, multi, cb) {
    this.model = this.models[model_name];
    params = params || {};
    multi = multi || false;
    if (typeof cb != "function") cb = cbFunction;
    let query = this.model.update(params, { $set: data }, { multi });
    query.exec(function(err, data) {
      if (err) return cb(err);
      return cb(null, data);
    });
  }
}
module.exports = Dao;
