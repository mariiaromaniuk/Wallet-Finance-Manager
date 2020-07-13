const Sequelize = require("sequelize");
const db = require("../db");

const Transaction = db.define("transaction", {
  name: {
    type: Sequelize.STRING,
  },
  amount: {
    type: Sequelize.FLOAT,
  },
  date: {
    type: Sequelize.STRING,
  },
  accountId: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
  },
  included: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Transaction;
