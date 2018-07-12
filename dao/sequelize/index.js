let cbFunction = function() {};

class Dao {
  constructor({
    db: { dialect, datbase_name, user, password, host, port },
    modelsPath
  }) {
    this.modelPath = modelsPath;
    this.sequelize = require("./sequelize")({
      dialect,
      datbase_name,
      user,
      password,
      host,
      port
    });
    this.models = require("./models_init")(this.sequelize, modelsPath);
  }
  add(model_name, data, cb) {
    this.model = this.models[model_name];
    console.log(this.model);
    if (typeof cb != "function") cb = cbFunction;
    return this.model.create(data);
  }
  get(model_name, params, project, cb) {
    this.model = this.models[model_name];
    params = params || {};
    if (typeof cb != "function") cb = cbFunction;
    let query = this.model.findOne({ where: params });
    return query;
  }
  getAll(model_name, params, project, cb) {
    this.model = this.models[model_name];
    params = params || {};
    if (typeof cb != "function") cb = cbFunction;
    let query = this.model.findAll({ where: params });
    return query;
  }
  destory(model_name, params, cb) {
    this.model = this.models[model_name];
    params = params || {};
    if (typeof cb != "function") cb = cbFunction;
    let query = this.model.destory({ where: params });
    return query;
  }
  update(model_name, params, data, multi, cb) {
    this.model = this.models[model_name];
    params = params || {};
    multi = multi || false;
    if (typeof cb != "function") cb = cbFunction;
    return this.model.update(data, { where: params });
  }
}
module.exports = Dao;
