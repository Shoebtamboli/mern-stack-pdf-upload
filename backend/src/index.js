const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fileRouter = require("./routes/files");
require("./db/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//to parse body from url
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/files", fileRouter);
// Serve images folder as static
app.use("/files", express.static(path.join(__dirname, "files")));

app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/", (req, res) => {
  res.send("Welcome to the express app");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
