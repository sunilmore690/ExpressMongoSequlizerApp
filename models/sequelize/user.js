var Sequelize = require("sequelize");
module.exports = {
  email: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
};
