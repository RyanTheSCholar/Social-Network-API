const {
  getUsers,
  singleUser,
  createUser,
  updateUser,
  addFriend,
  deleteFriend,
  deleteUser
} = require("../../controllers/userControllers");
const router = require('express').Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:_id').get(singleUser).put(updateUser).delete(deleteUser);
router.route('/:_id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
