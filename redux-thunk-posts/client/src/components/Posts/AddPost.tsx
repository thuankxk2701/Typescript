import React, { useState } from "react";
import { useHistory } from "react-router";
import { createPost } from "../../redux/action";
import { useDispatch } from "react-redux";
import { postFilePostImage } from "../../redux/action";
import { API_URL } from "../../redux/types";
import ProgressBar from "react-bootstrap/ProgressBar";
const AddPost: React.FC = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [uploadedPercentImage, setUploadedPercentImage] = useState<number>(0);
  const [uploadedFileImage, setUploadedFileImage] = useState<string>("");
  const handleFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) return;
      const fileImage = e.target.files[0];

      const formData = new FormData();
      const options = {
        onUploadProgress: (progressEvent: any) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          setUploadedPercentImage(percent);
        },
      };
      formData.append("file", fileImage);
      postFilePostImage(formData, options);

      setTimeout(() => {
        setUploadedFileImage(API_URL + "uploads/" + String(fileImage.name));
        setUploadedPercentImage(0);
      }, 1500);
    } catch (error: any) {
      throw new Error(error);
    }
  };
  const handleSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const randomId = Math.random().toString(36).split("").slice(7).join(".");
    const new_post = {
      id: randomId,
      title,
      body,
      url_image: uploadedFileImage,
    };
    dispatch(createPost(new_post));
    history.push("/");
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="card shadow">
          <div className="card-header">Add A Post</div>
          <div className="card-body">
            <form onSubmit={handleSubmitForm}>
              <div className="form-group">
                {uploadedFileImage && (
                  <img
                    src={uploadedFileImage}
                    alt="ImageUploaded"
                    style={{
                      width: "100%",
                      height: "80vh",
                      marginBottom: "1.6rem",
                      borderRadius: "5px",
                    }}
                  />
                )}
                <input
                  type="file"
                  accept="image/png, image/jpeg,image/jpg"
                  onChange={e => handleFileImage(e)}
                />
                {uploadedPercentImage > 0 && (
                  <>
                    <br />
                    <ProgressBar now={uploadedPercentImage} label={`${uploadedPercentImage}%`} />
                  </>
                )}

                <br />
                <br />
                <h1>Title</h1>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Post Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <br />
              <div className="form-group">
                <h1>Body</h1>
                <textarea
                  rows={5}
                  className="form-control form-control-lg"
                  placeholder="Enter Post Body Text"
                  value={body}
                  onChange={e => setBody(e.target.value)}
                ></textarea>
              </div>
              <br />
              <button className="btn btn-primary btn-lg">Add New Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
