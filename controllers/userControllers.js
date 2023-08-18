const { Schema } = require("mongoose");
const { User, Thought } = require("../models");

//   /api/users
//   /api/users/:_id/friends/:friendId

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find({});
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // get a single user by its _id and populated thought and friend data
  async singleUser(req, res) {
    try {
      const user = await User.find({ _id: req.params._id })
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .lean();
      if (!user) {
        return res.status(404).json({ message: "this is not a user id" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // post a new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      return res.status(200).json(newUser);

    } catch (err) {
        console.log(err);
      res.status(500).json(err);
    }
  },
  // delete to remove user by it's _id
  async deleteUser(req, res) {
    try {
      const deleteUser = await User.findOneAndRemove({
        _id: req.params._id,
      });
      if (!deleteUser) {
        return res.status(404).json({ message: "User does not exist" });
      }
      Thought.deleteMany({ _id: { $in: User.thoughts } });
      res.status(200).json({ message: "User and thoughts deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // put to update a user by its _id
  async updateUser(req, res) {
    try {
      const updateUser = await User.findOneAndUpdate(
        { _id: req.params._id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updateUser) {
        res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //   add friend
  async addFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params._id },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true , new: true }
      );
      if (!friend) {
        res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(friend);
    } catch (err) {
        console.log(err);
      res.status(500).json(err);
    }
  },
  //   delete friend
  async deleteFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params._id },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if(!friend){
        res.status(404).json({message: "User not found"});
      }
      res.status(200).json(friend);
    } catch (err) {
        res.status(500).json(err);
    }
  },
};
