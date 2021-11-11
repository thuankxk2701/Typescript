const express = require("express");
const { upload } = require("../helpers/fileHelpers");
const { postSingleFileUpload} = require('../controllers/fileUpdateControllers');

const router = express.Router();

router.post("/singleFile", upload.single("file"), postSingleFileUpload);


module.exports= router;
