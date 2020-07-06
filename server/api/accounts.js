const router = require("express").Router();
const { Account, User } = require("../db/models");
module.export = router;

router.get("/:id", async (req, res, next) => {
  try {
    const accountId = req.params.id;
    const account = await Account.findByPk(accountId);
    if (account) {
      res.status(200).json(account);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newAccount = await Account.create({
      account_id: req.body.account_id,
      current_balance: req.body.current_balance,
      available_balance: req.body.available_balance,
      name: req.body.name,
    });
    if (newAccount) {
      res.status(200).json({
        message: "New Account Created",
        account: newAccount,
      });
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
    const accountId = req.params.id
})
