const { Schema } = require("mongoose");
const { User, Thought } = require("../models");

//   /api/users
//   /api/users/:userId/friends/:friendId


// put to update a user by its _id


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
      const user = await User.find({ id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .select("-__v")
        .lean();
      if (!user) {
        return res.status(404).json({ message: "this is not a user id" });
      }
      res.status(200).json();
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
        res.status(500).json(err);
    }
  },
  // delete to remove user by it's _id
  async deleteUser(req, res) {
    try {
        const deleteUser = await User.findOneAndRemove({id: req.params.userId});
        if (!deleteUser){
            return res.status(404).json({message: 'User does not exist'});
        }
            Thought.deleteMany({_id: {$in: User.thoughts}})
            res.status(200).json({message: 'User and thoughts deleted'})
    } catch (err) {
        res.status(500).json(err);
    }
  }
};
