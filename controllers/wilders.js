//controllers/wilders.js
const WilderModel = require("../models/Wilder");

module.exports = {
  create: async (req, res, next) => {
    await WilderModel.init();
    const wilder = new WilderModel(req.body);
    const result = await wilder.save();
    res.json({ result });
  },

  retrieve: async (req, res) => {
    const wilderFind = await WilderModel.find();
    res.json({ wilderFind });
  },

  delete: async (req, res) => {
    const wilderRemove = await WilderModel.deleteOne({ _id: req.params.id });
    res.json({ wilderRemove });
  },

  update: async (req, res) => {
    const wilderUpdate = await WilderModel.updateOne(
      { _id: req.body._id },
      req.body
    );
    res.json({ wilderUpdate });
  },
};
