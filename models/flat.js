const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flatSchema = new Schema({
    flatname: String,
    author:{ 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    price: Number,
    roomsAvailable: Number,
    location: String,
    flatmates:{ 
        type: [Schema.Types.ObjectId], 
        ref: 'User' 
    },
  }, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });

const Flat = mongoose.model('Flat', flatSchema);

module.exports = Flat;