const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/User");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "SECRET";

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        let user = await User.findOne({ _id: payload._id });
        if (!user) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (err) {
        return done(err);
      }
    })
  );
};
