import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/action";

interface PostCardProps {
  postCardItem: {
    id: any;
    url_image_1600x900: string;
    title: string;
    body: string;
  };
}
const PostCard: React.FC<PostCardProps> = ({ postCardItem }) => {
  const dispatch = useDispatch();

  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="card custom-card">
        <img
          src={postCardItem.url_image_1600x900}
          alt={postCardItem.title}
          className="card-img-top"
        />
        <Link to={`/updatePost/${postCardItem.id}`} className="btn btn-danger btn-edit">
          <span className="material-icons">edit</span>
        </Link>
        <button
          className="btn btn-danger btn-delete"
          onClick={() => dispatch(deletePost(postCardItem.id))}
        >
          <span className="material-icons">delete</span>
        </button>
        <div className="card-body">
          <h6 className="text-secondary">{postCardItem.title}</h6>
          <p>{postCardItem.body}</p>
        </div>
        <div className="card-footer">
          <Link to={`/post/${postCardItem.id}`} className="btn btn-primary">
            <span className="mb-1"> read more</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
