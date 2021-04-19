//model/Skill.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SkillSchema = new Schema({
  skills: [{ title: String, votes: Number }],
});

module.exports = mongoose.model("skill", SkillSchema);
