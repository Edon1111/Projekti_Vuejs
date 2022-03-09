const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
  name: String,
  surname:String,
  message: String,
  email:String
});
const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;