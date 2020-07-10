const router = require("express").Router();
const { User, Budget, Transaction, Account } = require("../db/models/index");

router.post("/login", (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        console.log("No such user found:", req.body.email);
        res.status(401).send("Wrong username and/or password");
      } else if (!user.correctPassword(req.body.password)) {
        console.log("Incorrect password for user:", req.body.email);
        res.status(401).send("Wrong username and/or password");
      } else {
        let currentDate = new Date();
        user.update({lastLogin: currentDate });
        req.login(user, err => (err ? next(err) : res.json(user) ))
      }
    })
    .catch(next);
});

router.post("/signup", async (req, res, next) => {
  try {
    let user = await User.create(req.body);
    user.budget = await user.createBudget();
    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.delete("/logout", (req, res) => {
  req.logout();
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.status(200).end();
    }
  });
  res.redirect("/");
});

router.get("/me", async (req, res) => {
  res.json(req.user);
});

module.exports = router;
