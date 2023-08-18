const { Thought, User } = require("../models");

//   /api/thoughts
//
//   /api/thoughts/:thoughtId/reactions/:reactionId
//
// post to create a reaction stored in a single thought's reaction array field
// delete to pull and remove a reaction by the reaction's reactionId value

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      return res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single thought by its _id
  async singleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Post to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);

      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { applications: newThought._id } },
        { new: true }
      );

      if(!user){
        return res.status(404).json({message: 'No id found'})
      }
      return res.status(200).json({message: 'Thought has been created'});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // delete to remove a thought by its _id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'Thought deleted, but no user found' });
      }
      return res.status(200).json({message: 'This thought is no longer available'})
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // put to update a thought by its _id
  async updateThought(req, res) {
    try {
      const update = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!update) {
        console.log(update)
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.status(200).json(update);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true , new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'Thought not found'});
      }
      res.status(200).json(thought);
    } catch (err) {
        console.log(err);
      res.status(500).json(err);
    }
  },
  //   delete friend
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: {reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if(!reaction){
        res.status(404).json({message: "User not found"});
      }
      res.status(200).json(reaction);
    } catch (err) {
        res.status(500).json(err);
    }
  },

};
