const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const Router = express.Router();
const File = require("../model/File");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./src/files";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".pdf");
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
    return cb(
      new Error(
        "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
      )
    );
  }
  cb(undefined, true); // continue with upload
};

const upload = multer({
  storage,
  limits: {
    fileSize: 10000000, // max file size 10MB = 10000000 bytes
  },
  fileFilter,
});

Router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      const newFile = new File({
        filename: req.file.filename,
        filepath: req.file.path,
        filetype: req.file.mimetype,
        size: req.file.size,
      });

      await newFile.save();
      res.send("File uploaded!");
    } catch (error) {
      res.status(400).send("Error while uploading file. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.get("/all", async (req, res) => {
  const dirPath = path.join(__dirname, "../files"); // Adjust the path according to your directory structure

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error("Error reading the directory", err);
      return res.status(500).send("Error while fetching files");
    }

    const fileList = files.map((file) => {
      const filePath = path.join(dirPath, file);
      const fileStat = fs.statSync(filePath);

      // Generate a unique ID for each file
      const fileId = crypto
        .createHash("md5")
        .update(file + fileStat.mtime.toISOString())
        .digest("hex");

      return {
        id: fileId,
        filename: file,
        filepath: filePath,
        size: fileStat.size,
        uploadDate: fileStat.mtime, // Modification time
      };
    });

    res.json(fileList);
  });
});

module.exports = Router;
