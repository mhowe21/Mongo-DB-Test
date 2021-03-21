const { Schema, model, Types } = require("mongoose");
const Validator = require("../Utilities/validator");

const reactionSchema = new Schema({
  reactionID: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
    ref: "Users",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
});

module.exports = reactionSchema;