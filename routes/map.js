const path = require("path"),
  fs = require("fs");

let actionMethods = {
  index: { action: "get", route: "/{controller_name}" },
  destroy: { action: "delete", route: "/{controller_name}/:id" },
  update: { action: "put", route: "/{controller_name}/:id" },
  show: { action: "get", route: "/{controller_name}/:id" },
  create: { action: "post", route: "/{controller_name}" }
};
let baseMethods = function(dao) {
  let create = function(req, res, next) {
    let body = req.body;
    dao
      .add(body)
      .then(function(data) {
        res.json(data);
      })
      .catch(function(e) {
        return next(e);
      });
  };
  let index = async function(req, res, next) {
    //async await approach
    // try{
    //   let data = await dao.getAll(model_name,req.query);
    //   return res.json(data)
    // }catch(e){
    //   return next(e)
    // }
    //promise approach
    dao
      .getAll(req.query)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        return next(err);
      });
  };
  let show = function(req, res, next) {
    dao
      .get({ _id: req.params.id })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        return next(err);
      });
  };
  let destroy = function(req, res, next) {
    dao
      .destory({ _id: req.params.id })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        return next(err);
      });
  };
  let update = function(req, res, next) {
    delete req.body._id;
    let multi = false;
    dao
      .update({ _id: req.params.id }, req.body, multi)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        next(err);
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

/* GET home page. */

module.exports = function(app) {
  const controllerPath = path.resolve("./controller");
  let controller = {};
  let handlAction = function(route, handler, options) {
    options = options || { middeware: [] };

    let reqHandler;
    if (typeof handler == "function") {
      reqHandler = handler;
    } else if (typeof handler == "string") {
      let controller_name = handler.split("#")[0],
        action = handler.split("#")[1];
      if (!controller[controller_name]) {
        throw new Error(`controller, ${controller_name} not exists`);
      } else if (!controller[controller_name][action]) {
        throw new Error(
          `${action} handler not found for ${route} in  ${controller_name} controller`
        );
      } else if (typeof controller[controller_name][action] != "function") {
        throw new Error(
          `Expetcing callback funciton for ${route} but got an object `
        );
      }
      reqHandler = controller[controller_name][action];
    } else {
      throw new Error(`handler not found for ${route}`);
    }
    if (
      options.middeware &&
      Array.isArray(options.middeware) &&
      options.middeware.length
    ) {
      app[this.action](route, ...options.middeware, reqHandler);
    } else {
      app[this.action](route, reqHandler);
    }
  };
  fs.readdirSync(controllerPath).forEach(file => {
    let controllerMethods = require(controllerPath + "/" + file);
    let controller_name = path.parse(file).name;
    let model_name = controller_name;
    if (controllerMethods.model_name) {
      model_name = controllerMethods.model_name;
      delete controllerMethods.model_name;
    }
    let User = require("../dao/mongo").model(model_name);
    let default_methods = baseMethods(User);

    controller[controller_name] = Object.assign(
      default_methods,
      controllerMethods
    );
  });

  Object.keys(controller).forEach(function(controller_name) {
    Object.keys(actionMethods).forEach(function(key) {
      let route = actionMethods[key].route.replace(
        "{controller_name}",
        controller_name
      );
      let action = actionMethods[key].action;

      handlAction.call({ action }, route, controller[controller_name][key]);
    });
  });
  let map = {};
  ["post", "delete", "get", "update", "options"].forEach(function(action) {
    map[action] = handlAction.bind({ action: action });
  });
  return map;
};
