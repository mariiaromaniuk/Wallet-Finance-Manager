const router = require("express").Router();
const { Account, User } = require("../db/models");
module.exports = router;

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
      userId: req.body.userId,
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

router.put("/:id", async (req, res, next) => {
  try {
    const accountId = req.params.id;
    await Account.update(
      {
        account_id: req.body.account_id,
        current_balance: req.body.current_balance,
        available_balance: req.body.available_balance,
        name: req.body.name,
        // userId: req.session.passport.user,
      },
      {
        where: {
          id: accountId,
        },
      }
    );
    if (!accountId) {
      res.sendStatus(500);
    } else {
      const updatedAcct = await Account.findOne({
        where: { id: accountId },
      });
      res.json({
        message: "Account updated successfully",
        project: updatedAcct,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const accountId = req.params.id;
    const account = Account.findOne({
      where: { id: accountId },
    });
    if (account) {
      Account.destroy({
        where: {
          id: accountId,
        },
      });
      res.json({
        message: "Account deleted successfully",
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});
