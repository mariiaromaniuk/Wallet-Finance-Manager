const router = require("express").Router();
module.exports = router;

router.use("/user", require("./users"));
router.use("/accounts", require("./accounts"));
router.use("/budget", require("./budgets"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
