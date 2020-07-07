const User = require('./user');
const Account = require('./account');
const Transaction = require('./transaction');
const Budget = require('./budget');

/*
 * Associations between the models.
 */
// User.hasMany(Item);
// Item.belongsTo(User);

// Item.hasMany(Account);
// Account.belongsTo(Item);

User.hasMany(Account);
Account.belongsTo(User);

User.hasMany(Transaction);
Transaction.belongsTo(User);

User.hasOne(Budget);
Budget.belongsTo(User);

/*
 * We'll export all of our models here, so that any time a module needs
 * a model, we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Account,
  Transaction,
  Budget,
};