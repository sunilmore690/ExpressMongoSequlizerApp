const MongoDao = require("./mongodb/index"),
  config = require("config");
path = require("path");

module.exports = new MongoDao({
  db: {
    connectionString: config.db.URI,
    debug: config.db.debug
  },
  modelPath: path.resolve("./models/mongo/")
});
