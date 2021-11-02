import React from "react";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import { typesInitialStateProps } from "../../redux/reducer";

const Posts: React.FC = () => {
  const posts = useSelector((state: typesInitialStateProps) => state.posts);

  return (
    <div className="row">
      {posts.map(postItem => (
        <PostCard postCardItem={postItem} />
      ))}
    </div>
  );
};

export default Posts;
