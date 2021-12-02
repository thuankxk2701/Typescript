import  express from "express";
import  { upload } from "../helpers/fileHelpers";
import  { postSingleFileUpload} from '../controllers/fileUpdateControllers';

const router = express.Router();

router.post("/singleFile", upload.single("file"), postSingleFileUpload);


export default router;
