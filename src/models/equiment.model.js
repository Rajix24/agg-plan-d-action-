const  mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    assetTag: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    archived: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = Equipment;