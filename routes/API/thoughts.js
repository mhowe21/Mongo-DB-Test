const router = require("express").Router();
const db = require("../../models");

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

router.post("", ({ params, body }, res) => {
  db.Thought.create({
    thoughtText: body.thoughtText,
    username: body.username,
  })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
});

module.exports = router;
