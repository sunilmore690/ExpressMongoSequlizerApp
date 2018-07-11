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
const User = sequelizer.define("USER", {
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
});

// User.hasOne(Company, {
//     foreignKey: 'company_id'
// })

module.exports = User;
