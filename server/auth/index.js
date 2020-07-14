const router = require("express").Router();
const { User } = require("../db/models/index");

router.post("/login", (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        console.log("No such user found:", req.body.email);
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send("Wrong username and/or password");
      } else {
        let currentDate = new Date();
        user.update({ lastLogin: currentDate });
        req.login(user, (err) => (err ? next(err) : res.json(user)));
      }
    })
    .catch(next);
});

router.post("/signup", async (req, res, next) => {
  try {
    let user = await User.create(req.body);

    if (!user) {
      throw new Error("Something is wrong with signup post route");
    }

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

router.post("/logout", (req, res) => {
  try {
    req.logout();
    req.session.destroy();
  } catch (error) {
    console.log("Logout Error", error);
  }
});

router.get("/me", async (req, res) => {
  res.json(user);
});

module.exports = router;

// router.use("/faceID", require("./faceid"));
// router.use('/google', require('./google'));
