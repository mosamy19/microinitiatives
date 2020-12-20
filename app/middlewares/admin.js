const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user.isAdmin) {
      return res.status(400).json({
        message: "you have no acces",
      });
    }

    req.user = user;
    return next();
  })(req, res, next);
};
