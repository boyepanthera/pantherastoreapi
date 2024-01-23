const express = require("express");
const api = express();

api.get("/", function (req, res) {
  return res.status(200).json({
    message: "Panthera store api service",
  });
});

api.listen(4000, function () {
  console.log("Service listening on port 4000");
});
