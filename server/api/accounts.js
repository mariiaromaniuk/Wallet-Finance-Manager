const router = require("express").Router();
const { Account,User } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => { 
  try {
    if (req.user) {
      const data = await Account.findAll({
        where: {
          userId: req.user.dataValues.id,
        },
      });
      res.status(200).json(data);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/user/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const data = await Account.findAll({
      where: {
        userId: userId,
      },
    });
    if (!data) {
      res.sendStatus(404);
    } else {
      res.status(200).json({
        message: "received all accounts for this user",
        data,
      });
    }
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    // console.log(req.user.dataValues.id);
    // console.log("req.params", req.params);
    const accountId = req.params.id;
    const account = await Account.findOne({
      where: { userId: req.user.dataValues.id },
    });
    if (accountId && req.user && account) {
      res.status(200).json(account);
    } else {
      res.sendStatus(401);
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
      userId: req.user.dataValues.id,
    });
    if (newAccount && req.user) {
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
    if (account && req.user) {
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
