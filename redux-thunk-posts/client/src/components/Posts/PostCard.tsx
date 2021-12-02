import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/action";
import { AiFillEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";

interface PostCardProps {
  postCardItem: {
    id: any;
    url_image: string;
    title: string;
    body: string;
  };
}
const PostCard: React.FC<PostCardProps> = ({ postCardItem }) => {
  const dispatch = useDispatch();

  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="card custom-card">
        <img src={postCardItem.url_image} alt={postCardItem.title} className="card-img-top" style={{height:"11.2rem"}} />
        <Link to={`/updatePost/${postCardItem.id}`} className="btn btn-danger btn-edit">
          <span className="material-icons">
            <AiFillEdit style={{ fontSize: "1.6rem" }} />
          </span>
        </Link>
        <button
          className="btn btn-danger btn-delete"
          onClick={() => dispatch(deletePost(postCardItem.id))}
        >
          <span className="material-icons">
            {" "}
            <IoTrashOutline style={{ fontSize: "1.6rem" }} />
          </span>
        </button>
        <div className="card-body">
          <h6 className="text-secondary">{postCardItem.title}</h6>
          <p>{postCardItem.body}</p>
        </div>
        <div className="card-footer" style={{ textAlign: "center" }}>
          <Link
            to={`/post/${postCardItem.id}`}
            className="btn btn-primary"
            style={{ boxShadow: "0 2px 0.5rem #969487" }}
          >
            <span className="mb-1"> Read more</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
