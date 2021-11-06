import React, { useState } from "react";
import { useHistory } from "react-router";
import { createPost } from "../../redux/action";
import { useDispatch } from "react-redux";
const AddPost: React.FC = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const handleSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const randomId = Math.random().toString(36).split("").slice(7).join(".");
    console.log();

    const new_post = {
      id: randomId,
      title,
      body,
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
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg,image/jpg"
                />
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
