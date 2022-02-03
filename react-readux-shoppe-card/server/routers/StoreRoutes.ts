import express from "express";
import { upload } from "../helpers/fileHelpers";
import { postSingleFileUpload } from "../controllers/fileUpdateControllers";
import { getAllProducts, getProduct } from "../controllers/products";

const router = express.Router();

router.post("/singleFile", upload.single("file"), postSingleFileUpload);
router.route("/").get(getAllProducts);
router.route("/:id").get(getProduct);

export default router;
