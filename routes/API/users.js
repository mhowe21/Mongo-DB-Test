const router = require("express").Router();
const db = require("../../models");

router.post("/add_user", ({ body }, res) => {
  db.User.create(body).then((data) => {
    res.status(201).json(data);
    console.log(data);
  });
});

router.get("", (req, res) => {
  db.User.find({})
    .populate({
      path: "Thought",
      select: ["thoughtText", "createdAt", "username"],
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
router.get("/testing", (req, res) => {
  res.json("you found the testing rout");
});

module.exports = router;
