import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getPost, updatePost } from "../../redux/action";
import { typesInitialStateProps } from "../../redux/reducer";
const UpdatePost: React.FC = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const post = useSelector((state: typesInitialStateProps) => state.posts);

  const { id } = useParams<any>();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  console.log(id);

  useEffect(() => {
    loadPost();
  }, []);
  useEffect(() => {
    if (post) {
      setTitle(post[id].title);
      setBody(post[id].body);
    }
  }, [post[id]]);
  const loadPost = () => {
    dispatch(getPost(id));
  };
  const handleSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const update_post = {
      id,
      url_image_1600x900: post[id].url_image,
      title: title,
      body: body,
    };
    dispatch(updatePost(update_post));
    history.push("/");
  };
  return (
    <div className="container">
      <div className="py-4">
        <div className="card shadow">
          <div className="card-header">Update A Post</div>
          <div className="card-body">
            <form onSubmit={handleSubmitForm}>
              <img src={post[id].url_image} alt="" style={{ width: "100%", borderRadius: "3px" }} />
              <br />
              <br />
              <div className="form-group">
                <h1>Title</h1>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Post Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <h1 style={{ marginTop: "12px" }}>Body</h1>
              <div className="form-group">
                <textarea
                  rows={5}
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
