import   SingleFile from "../models/singleFile";

const postSingleFileUpload = async (req:any, res:any, next:any) => {
  try {
    const file = new SingleFile({
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    });

    await file.save();
    res.status(201).send("File Uploaded Successfully");
  } catch (error:any) {
    return res.status(400).send(error.message);
  }
};

const fileSizeFormatter = (bytes:number, decimal:number) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index];
};
export {
  postSingleFileUpload
};