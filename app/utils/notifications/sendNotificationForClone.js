const Initiative = require("../../models/Initiative");
const Notification = require("../../models/Notification");
const User = require("../../models/User");
const { serverError } = require("../error");

module.exports = async (
  req,
  res,
  clonedInitiativeOwner,
  clonedInitiativeId,
  initiativeTitle,
  initiativeId
) => {
  try {
    let user = await User.findOne({ _id: clonedInitiativeOwner });
    user.notifications++;
    user.save();

    let baseInitiative = await Initiative.findOne({
      _id: clonedInitiativeId,
    });
    baseInitiative.clones++;
    baseInitiative.save();

    let all_initiative = await Initiative.find({ clonedInitiativeId });
    all_initiative.map((item) => {
      item.clones = baseInitiative.clones;
      item.save();
    });

    await new Notification({
      body: `"${
        req.user.firstName + " " + req.user.familyName
      } " قام بتنفيذ مبادرتك  "${initiativeTitle}"`,
      author: clonedInitiativeOwner,
      initiative: initiativeId,
      type: "clone",
    }).save();
  } catch (error) {
    serverError(res, error);
  }
};
