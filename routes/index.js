const router = require("express").Router();
const API = require("./API");

router.use("/api/v1", API);

module.exports = router;
