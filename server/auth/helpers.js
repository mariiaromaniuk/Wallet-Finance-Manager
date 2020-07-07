function verifyAdmin(req, res, next) {
  // req.user is an instance of User
  // so isAdmin instance method can be used
  if (req.user && req.user.isAdmin()) {
    next(); // run next middleware when authorized
  } else {
    res.status(401).json({ error: "Not Authorized!" });
  }
}

function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ error: "Not Authorized!" });
  }
}

module.exports = {
  verifyAdmin,
  isLoggedIn,
};
