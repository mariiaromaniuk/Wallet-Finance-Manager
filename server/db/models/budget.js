const Sequelize = require("sequelize");
const db = require("../db");

const Budget = db.define("budget", {
  income: {
    type: Sequelize.FLOAT,
  },
  static_costs: {
    type: Sequelize.FLOAT,
  },
  savings: {
    type: Sequelize.FLOAT,
  },
  spending_budget: {
    type: Sequelize.FLOAT,
  },
  foodAndDrink: {
    type: Sequelize.FLOAT,
    defaultValue: 35,
  },
  travel: {
    type: Sequelize.FLOAT,
    defaultValue: 10,
  },
  recreation: {
    type: Sequelize.FLOAT,
    defaultValue: 15,
  },
  healthcare: {
    type: Sequelize.FLOAT,
    defaultValue: 10,
  },
  service: {
    type: Sequelize.FLOAT,
    defaultValue: 10,
  },
  community: {
    type: Sequelize.FLOAT,
    defaultValue: 10,
  },
  shops: {
    type: Sequelize.FLOAT,
    defaultValue: 10,
  },
});

module.exports = Budget;
