const router = require("express").Router();
const { User, Account, Transaction, Budget } = require("../db/models");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    await User.findOne({
      where: { id: userId },
      include: [{ model: Account }, { model: Budget }, { model: Transaction }],
    }).then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    });
    // if (data) {
    //   res.json(data);
    // } else {
    //   res.sendStatus(404);
    // }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    if (newUser) {
      res.json({ message: "Created Successfully", newUser });
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    console.log("error msg: ", error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        userId: req.body.userId,
        userName: req.body.userName,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    if (!userId) {
      res.sendStatus(500);
    } else {
      const updatedUser = await User.findOne({
        where: { id: userId },
      });
      res.json({
        message: "User updated successfully",
        project: updatedUser,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = User.findOne({
      where: {
        id: userId,
      },
    });
    if (user) {
      User.destroy({
        where: {
          id: userId,
        },
      });
      res.json({
        message: "User Deleted successfully!",
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});
