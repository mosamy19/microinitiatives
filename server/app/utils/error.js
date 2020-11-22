const { status } = require("./status");
module.exports = {
  serverError(res, err) {
    res.status(status.serverError).json({
      message: err
    });
  },
  resourceError(res, message) {
    res.status(status.bad).json({
      message,
    });
  },
};
