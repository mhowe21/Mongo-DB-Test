const { Schema, model } = require("mongoose");
const Validator = require("../Utilities/validator");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
