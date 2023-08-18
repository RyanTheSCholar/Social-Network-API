const {
  getThoughts,
  singleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtsControllers");

const router = require("express").Router();

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(singleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;