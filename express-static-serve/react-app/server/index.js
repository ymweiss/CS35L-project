const port = 3000
const path = require("path")

const express = require("express");
const app = express(); // create express app

app.use(express.static(path.join(__dirname, "..", "build")));


// start express server on port 3000
app.listen(port, () => {
  console.log("server started on port 3000");
});