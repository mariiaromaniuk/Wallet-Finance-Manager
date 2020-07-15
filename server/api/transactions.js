const router = require("express").Router();
const { Transaction, Account, User, Session } = require("../db/models");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (userId) {
      const data = await Transaction.findAll({ where: { userId: userId } });
      if (data) {
        res.status(200).json(data);
      }
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newTransaction = await Transaction.create(req.body);
    if (newTransaction && req.user) {
      res.status(200).json({
        message: "Transaction created successfully",
        transaction: newTransaction,
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
    const transactionId = req.params.id;
    await Transaction.update(
      {
        name: req.body.name,
        amount: req.body.amount,
        date: req.body.date,
        accountId: req.body.accountId,
        category: req.body.category,
        included: req.body.included,
        //   userId: req.user.id,
      },
      { where: { id: transactionId } }
    );
    if (!transactionId) {
      res.sendStatus(500);
    } else {
      const updatedTransaction = Transaction.findOne({
        where: {
          id: transactionId,
        },
      });
      res.status(200).json({
        message: "Transaction updated successfully",
        transaction: updatedTransaction,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.findOne({
      where: { id: transactionId },
    });
    if (!transaction || !req.user) {
      res.sendStatus(500);
    } else {
      await Transaction.destroy({
        where: { id: transactionId },
      });
      res.json({
        message: "Transaction deleted successfully",
      });
    }
  } catch (error) {
    next(error);
  }
});
