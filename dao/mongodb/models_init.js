const fs = require("fs");
const path = require("path");

module.exports = function(mongoose,modelsPath) {
  let obj = {}
  console.log('modelsPath',modelsPath)
  fs.readdirSync(modelsPath).forEach(file => {
    let model_name = path.parse(file).name
    obj[model_name] = mongoose.model(model_name,require(modelsPath  + '/' +file));
  });
//   console.log('obj',obj)
  return obj;

};

