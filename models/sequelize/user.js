var Sequelize = require("sequelize");
module.exports = {
    login: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    company_id: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    sig_mobile: {
      type: Sequelize.STRING
    }
  }
