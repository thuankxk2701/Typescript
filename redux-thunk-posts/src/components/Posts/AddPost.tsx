import React, { useState } from "react";
import { useHistory } from "react-router";
// import { createPost } from "../../redux/action";
const AddPost: React.FC = () => {
  let histore = useHistory();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  // const rows: string | undefined = "5";
  return (
    <div className="container">
      <div className="py-4">
        <div className="card shadow">
          <div className="card-header">Add A Post</div>
          <div className="card-body">
            <form
            // onSubmit
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
                  // rows={rows}
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
