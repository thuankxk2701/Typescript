import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../../redux/action";
import { useParams } from "react-router-dom";
import { typesInitialStateProps } from "../../redux/reducer";

const Post: React.FC = () => {
  const dispatch = useDispatch();
  const post = useSelector((state: typesInitialStateProps) => state.posts);
  const { id } = useParams<any>();
  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = () => {
    dispatch(getPost(id));
  };
  if (!post)
    if (!post) {
      return <h1>loading..</h1>;
    }

  return (
    <div>
      <img src={post[id].url_image_1920x1080} alt={post[id].title} />
      <div className="container">
        <div className="py-5">
          <h1 className="display-4 mb-3">{post[id].title}</h1>
          <p className="lead">{post[id].body}</p>
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio similique dicta, facere
            iusto non voluptatem assumenda. Adipisci molestias modi assumenda numquam animi quo odio
            quis, ad eligendi optio cumque atque earum et, velit doloribus fugit? Quam soluta earum
            architecto, cupiditate adipisci tempora doloribus! Asperiores quaerat ipsam libero optio
            distinctio excepturi.
          </p>
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio similique dicta, facere
            iusto non voluptatem assumenda. Adipisci molestias modi assumenda numquam animi quo odio
            quis, ad eligendi optio cumque atque earum et, velit doloribus fugit? Quam soluta earum
            architecto, cupiditate adipisci tempora doloribus! Asperiores quaerat ipsam libero optio
            distinctio excepturi.
          </p>
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi doloremque ab et
            perferendis, earum dolores quos iure provident labore id eum recusandae harum dolor iste
            consequuntur veniam, adipisci deleniti molestias voluptates quasi porro! Illo reiciendis
            est adipisci consequatur perspiciatis sapiente fugit esse eum, rem nostrum dolor
            officiis repellendus dolores aliquid quaerat aut dolore, explicabo labore similique
            deleniti? Adipisci ipsa error excepturi, quibusdam, unde repellat ratione iusto labore
            deleniti cumque animi! Eveniet ex voluptatum repudiandae vel rerum reprehenderit
            accusamus velit nam iusto, cum ut amet dignissimos corrupti quod consectetur unde
            temporibus saepe tenetur totam. Nulla ipsam aut temporibus! Officia, vero perferendis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
