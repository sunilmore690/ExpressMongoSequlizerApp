var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date },
  updatedAt: Date
});

userSchema.pre("save", function() {
  if (this.isNew) {
    this.createdAt = new Date();
  } else {
    this.updatedAt = new DataCue();
  }
});
module.exports = userSchema;
