const { Schema, model } = require("mongoose");
const Validator = require("../Utilities/validator");
const reactionSchema = require("./Reaction");

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
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
