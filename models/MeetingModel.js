const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
  sunbae: { type: Schema.Types.ObjectId, ref: "User" },
  hoobae: { type: Schema.Types.ObjectId, ref: "User" },
  completionTime: {type: Date},
  hoobaeConfirmation: {type: Boolean, default: false},
  sunbaeConfirmation: {type: Boolean, default: false},
  price: {type: Number},
 
});

module.exports = mongoose.model("Meeting", MeetingSchema);