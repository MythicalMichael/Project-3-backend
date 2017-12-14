const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flatSchema = new Schema(
  {
    flatname: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    price: Number,
    mainPicture: String,
    sidePictures: [String],
    rooms: Number,
    flatLocation: {
      location: Object,
      url: String
    },
    description: String,
    acepptedFlatmates: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    declinedFlatmates: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    flatmates: [
      {
        date: {
          type: Date,
          default: Date.now
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        status: {
          type: String,
          default: "pending",
          enum: ["pending", "accepted", "rejected"]
        },
        message: String,
        reply: String
      }
    ]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Flat = mongoose.model("Flat", flatSchema);

module.exports = Flat;
