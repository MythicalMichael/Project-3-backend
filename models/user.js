const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    status:{
        type:String,
        deafault:"pending",
        enum:["pending","accepted","rejected"]
    }
  }, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });

const User = mongoose.model('User', userSchema);

module.exports = User;