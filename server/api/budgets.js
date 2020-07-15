const router = require("express").Router();
const { Budget, Account, User } = require("../db/models");
module.exports = router;


router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const budget = await Budget.findOne({
      where: {
        userId: userId
      }
    });
    if (!budget) res.sendStatus(404);
    res.json(budget);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newBudget = await Budget.create(req.body);
    if (newBudget && req.user) {
      res.status(200).json({
        message: "New budget created succesfully",
        budget: newBudget,
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
    const user = req.user;
    const budget = await Budget.findOne({
      where: {
        userId: user.id
      }
    });
    if (!budget) res.sendStatus(404);
    const updatedBudget = await budget.update(req.body);
    res.json(updatedBudget);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const budgetId = req.params.id;
    const budget = await Budget.findByPk(budgetId);
    if (!budget || !req.user) {
      res.sendStatus(500);
    } else {
      await Budget.destroy({
        where: {
          id: budgetId,
        },
      });
      res.status(200).json({
        message: "Budget deleted successfully",
      });
    }
  } catch (error) {
    next(error);
  }
});
