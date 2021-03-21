const router = require("express").Router();
const db = require("../../models");
const { findOneAndUpdate } = require("../../models/Thought");

// router.get("", (req, res) => {
//   res.json("you have located the test rout for thoughts");
// });

router.get("", (req, res) => {
  db.Thought.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(500).json(err);
    });
});

router.get("/:id", ({ params, body }, res) => {
  db.Thought.find({ _id: params._id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

//add thought to user
router.post("", ({ params, body }, res) => {
  db.Thought.create({
    username: body.username,
    thoughtText: body.thoughtText,
  })
    .then((data) => {
      db.User.findOneAndUpdate(
        { username: body.username },
        { $push: { thoughts: data._id } },
        {
          new: true,
        }
      ).then((addedData) => {
        console.log(addedData);
      });
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
module.exports = router;
