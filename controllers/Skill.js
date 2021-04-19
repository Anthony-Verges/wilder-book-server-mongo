//controllers/skill.js
const SkillModel = require("../models/Skill");

module.exports = {
  create: async (req, rest, next) => {
    await SkillModel.init();
    const skill = new SkillModel(req.body);
    const result = await skill.save();
    rest.json({ result });
  },
};
