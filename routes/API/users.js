const router = require("express").Router();
const db = require("../../models");

router.post("", ({ body }, res) => {
  db.User.create(body).then((data) => {
    res.status(201).json(data);
    console.log(data);
  });
});

router.get("", (req, res) => {
  db.User.find({})
    .populate({
      path: "Thought",
      select: "thoughtText",
    })
    .then((data) => {
      res.json(data);
    });
});

router.get("/:id", ({ params, body }, res) => {
  db.User.find({ _id: params.id })
    .populate({
      path: "Thoughts",
      select: ["Thoughts", "Friends"],
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(err);
    });
});

router.put("/:id", ({ params, body }, res) => {
  db.User.findOneAndUpdate({ _id: params.id }, body, {
    new: true,
    runValidators: true,
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

router.delete("/:id", ({ params, body }, res) => {
  db.User.findOneAndDelete({ _id: params.id }).then((data) => {
    //res.status(200).json(data);
    // clear user Thoughts on delete
    db.Thought.deleteMany({ username: data.username }, { new: true })
      .then((deletedData) => {
        res.status(200).json(deletedData);
      })
      .catch((err) => {
        console.log(err);
        res.json(404).json(err);
      });
  });
});

router.post("/:id/friends/:friendId", ({ params, body }, res) => {
  db.User.findOneAndUpdate(
    { _id: params.id },
    { $push: { friends: params.friendId } },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

router.delete("/:id/friends/:friendId", ({ params, body }, res) => {
  db.User.findOneAndUpdate(
    { _id: params.id },
    { $pull: { friends: params.friendId } },
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

module.exports = router;
