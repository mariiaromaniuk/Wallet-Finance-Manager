const Sequelize = require('sequelize');
const db = require('../db');

const Budget = db.define('budget', {
  income: {
    type: Sequelize.INTEGER
  },
  static_costs: {
    type: Sequelize.INTEGER
  },
  savings: {
    type: Sequelize.INTEGER
  },
  spending_budget: {
    type: Sequelize.INTEGER
  },
  food_and_drink: {
    type: Sequelize.INTEGER,
    defaultValue: 35
  },
  travel: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  },
  entertainment: {
    type: Sequelize.INTEGER,
    defaultValue: 15
  },
  healthcare: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  },
  service: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  },
  community: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  },
  shopping: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  },
});

module.exports = Budget;