const  mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    equipmentId: {
      type: String,
      ref: "Equipment",
      required: false,
      default: null,
    },

    status: {
      type: String,
      required: true,
      enum: ["DONE", "IN_PROGRESS"],
    },

    performedAt: {
      type: Date,
      default: null,
    },

    costCents: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Maintenance = mongoose.model(
  "Maintenance",
  maintenanceSchema
);

module.exports = Maintenance;