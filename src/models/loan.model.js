const  mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    memberId: {
      type: String,
      required: true,
      ref: "Member",
    },

    equipmentId: {
      type: String,
      required: true,
      ref: "Equipment",
    },

    status: {
      type: String,
      required: true,
      enum: ["RETURNED", "ACTIVE", "CANCELLED"],
    },

    startedAt: {
      type: Date,
      required: true,
    },

    returnedAt: {
      type: Date,
      default: null,
    },

    durationDays: {
      type: Number,
      required: true,
      min: 0,
    },

    feeCents: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;