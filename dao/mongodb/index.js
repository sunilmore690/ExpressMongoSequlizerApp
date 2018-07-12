let cbFunction = function() {};
let mongoose = require("mongoose");
class Dao {
  constructor({ db: { connectionString, debug }, modelPath }) {
    this.modelPath = modelPath;
    this.connectionString = connectionString;
    this.mongoose = mongoose.createConnection(connectionString, {
      useNewUrlParser: true
    });
    this.models = require("./models_init")(this.mongoose, modelPath);
    mongoose.set("debug", debug);
  }
  add(model_name, data, cb) {
    this.model = this.models[model_name];
    console.log(this.model);
    if (typeof cb != "function") cb = cbFunction;
    let model = new this.model(data);
    return new Promise((resolve, reject) => {
      model.save(function(err, obj) {
        if (err) reject(err);
        else resolve(obj);
      });
    });
  }
  get(model_name, params, project, cb) {
    this.model = this.models[model_name];
    params = params || {};
    if (typeof cb != "function") cb = cbFunction;
    let query = this.model.findOne(params, project).lean();
    return query;
  }
  getAll(model_name, params, project, cb) {
    this.model = this.models[model_name];
    params = params || {};
    if (typeof cb != "function") cb = cbFunction;
    return this.model.find(params, project).lean();
  }
  destory(model_name, params, cb) {
    this.model = this.models[model_name];
    params = params || {};
    if (typeof cb != "function") cb = cbFunction;
    let query = this.model.remove(params);
    return new Promise((resolve, reject) => {
      query.exec(function(err, data) {
        if (err) reject(err);
        return resolve(data);
      });
    });
  }
  update(model_name, params, data, multi, cb) {
    this.model = this.models[model_name];
    params = params || {};
    multi = multi || false;
    if (typeof cb != "function") cb = cbFunction;
    let query = this.model.update(params, { $set: data }, { multi });
    return new Promise((resolve, reject) => {
      query.exec(function(err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }
}
module.exports = Dao;
