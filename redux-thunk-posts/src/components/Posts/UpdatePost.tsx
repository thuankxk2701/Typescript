import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPost } from "../../redux/action";
import { useParams } from "react-router-dom";
const UpdatePost: React.FC = () => {
  const dispatch = useDispatch();
  let id: any;
  // { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const loadPost = () => {
    dispatch(getPost(2));
  };
  return (
    <div className="container">
      <div className="py-4">
        <div className="card shadow">
          <div className="card-header">Update A Post</div>
          <div className="card-body">
            <form
            //   onSubmit
            >
              <div className="form-group">
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
                <textarea
                  //   rows="5"
                  className="form-control form-control-lg"
                  placeholder="Enter Post Body Text"
                  value={body}
                  onChange={e => setBody(e.target.value)}
                ></textarea>
              </div>
              <br />
              <button className="btn btn-primary btn-lg">Update Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
