const { Schema, model, Types } = require("mongoose");

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
        reactions:[reactionSchema],
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
const reactionSchema = new Schema(
    {
      reactionId: {
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
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // add some get property to change the date to something readable
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );

  thoughtSchema.virtual('numOfReactions')
.get(() => {
    return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
