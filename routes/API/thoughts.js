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
  db.Thought.find({ _id: params.id })
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

router.delete("/:id", ({ params, body }, res) => {
  db.Thought.findOneAndDelete({ _id: params.id })
    .then((data) => {
      console.log(data);
      db.User.findOneAndUpdate(
        { username: data.username },
        { $pull: { thoughts: data._id } },
        { new: true }
      ).then((updateData) => {
        console.log(updateData);
        res.json(updateData);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/:id", ({ params, body }, res) => {
  db.Thought.findOneAndUpdate(
    { _id: params.id },
    { $set: { thoughtText: body.thoughtText } },
    { new: true }
  )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

// reactions
router.get("/:id/reactions", ({ params, body }, res) => {
  db.Thought.find({ _id: params.id })
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

router.post("/:id/reactions", ({ params, body }, res) => {
  db.Thought.findOneAndUpdate(
    { _id: params.id },
    { $push: { reactions: body } },
    { new: true, runValidators: true }
  )
    .then((data) => {
      console.log(data);
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id/reactions/:reactionId", ({ params, body }, res) => {
  db.Thought.findOneAndUpdate(
    { _id: params.id },
    { $pull: { reactions: { reactionID: params.reactionId } } },
    { new: true }
  )
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});
module.exports = router;
