const Sequelize = require('sequelize');
const db = require('../db');

const Account = db.define('account', {
  account_id: {
    type: Sequelize.STRING,
  },
  // current balance is the total amount of funds in user account
  current_balance: {
    type: Sequelize.INTEGER,
  },
  // available balance is user's current balance less any outstanding 
  // holds or debits that have not yet posted to the account
  available_balance: {
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
  }
});

module.exports = Account;