var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
// create a schema
var companySchema = new Schema({
  name: {type:String},
  slug:{type:String,unique:true},
  address: {},
  createdAt: { type: Date },
  updatedAt: Date
});
companySchema.plugin(mongoosePaginate);
companySchema.pre("save", function() {
  if (this.isNew) {
    this.createdAt = new Date();
  } else {
    this.updatedAt = new DataCue();
  }
});
module.exports = companySchema;
