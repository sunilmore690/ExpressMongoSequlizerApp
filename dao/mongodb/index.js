let cbFunction = function() {};
let mongoose = require("mongoose");
const crud = {
  add(data, cb) {
    if (typeof cb != "function") cb = cbFunction;
    let model = new this.Model(data);
    return new Promise((resolve, reject) => {
      model.save(function(err, obj) {
        if (err) reject(err);
        else resolve(obj);
      });
    });
  },
  get(params, project, cb) {
    params = params || {};
    if (typeof cb != "function") cb = cbFunction;
    let query = this.Model.findOne(params, project).lean();
    return query;
  },
  getAll(params, project, cb) {
    params = params || {};
    if (typeof cb != "function") cb = cbFunction;
    return this.Model.find(params, project).lean();
  },
  destory(params, cb) {
    params = params || {};
    if (typeof cb != "function") cb = cbFunction;
    let query = this.Model.remove(params);
    return new Promise((resolve, reject) => {
      query.exec(function(err, data) {
        if (err) reject(err);
        return resolve(data);
      });
    });
  },
  update(params, data, multi, cb) {
    params = params || {};
    multi = multi || false;
    if (typeof cb != "function") cb = cbFunction;
    let query = this.Model.update(params, { $set: data }, { multi });
    return new Promise((resolve, reject) => {
      query.exec(function(err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }
};
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
  model(model_name) {
    let Model = this.models[model_name];
    return Object.assign({Model},crud)
  }
}
module.exports = Dao;
