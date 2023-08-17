const { Schema, model } = require("mongoose");
const Reaction = require("./reaction");

const thoughtSchema = new Schema(
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
      // add some get property to change the date to something readable
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        reactions:[Reaction],
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
