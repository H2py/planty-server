const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Welcome to the Plant API Server!");
});

router.get("/api/get/nodejs-api", function (req, res) {
  res.status(200).json({
    message: "hello get api nodejs-api",
  });
});

router.post("/api/post/nodejs-api", function (req, res) {
  res.status(200).json({
    message: "hello post api nodejs-api",
  });
});

router.get("/plant-data", (req, res) => {
  const plantData = req.app.locals.plantData;
  if (plantData.length === 0) {
    return res.status(404).json({ message: "No data available" });
  }
  res.json(plantData[plantData.length - 1]);
});

module.exports = router;
