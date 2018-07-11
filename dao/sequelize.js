const SeqalizeDao = require("./seqalize/index"),
  config = require("config");
path = require("path");

module.exports = new SeqalizeDao({
  db: config.sequelize,
  modelsPath: path.resolve("./models/sequelize/")
});
