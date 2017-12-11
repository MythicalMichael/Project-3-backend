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
    location: String,
    description: String,
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
          deafault: "pending",
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
