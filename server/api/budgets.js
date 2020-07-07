const router = require("express").Router();
const { Budget, Account, User } = require("../db/models");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const budgetId = req.params.id;
    const budget = await Budget.findByPk(budgetId);
    if (budget) {
      res.status(200).json(budget);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newBudget = await Budget.create(req.body);
    if (newBudget) {
      res.status(200).json({
        message: "new budget created succesfully",
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
    const budgetId = req.params.id;
    await Budget.update(
      {
        income: req.body.income,
        static_costs: req.body.static_costs,
        savings: req.body.savings,
        spending_budget: req.body.spending_budget,
        food_drink: req.body.food_drink,
        travel: req.body.travel,
        entertainment: req.body.entertainment,
        healthcare: req.body.healthcare,
        service: req.body.service,
        community: req.body.community,
        shopping: req.body.shopping,
      },
      { where: { id: budgetId } }
    );
    if (!budgetId) {
      res.sendStatus(500);
    } else {
      const updatedBudget = await Budget.findOne({ where: { id: budgetId } });
      res.status(200).json({
        message: "Budget updated succesfully",
        budget: updatedBudget,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const budgetId = req.params.id;
    const budget = await Budget.findByPk(budgetId);
    if (!budget) {
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
