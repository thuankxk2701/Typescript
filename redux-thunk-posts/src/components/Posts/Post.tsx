import React from "react";

const Post: React.FC = () => {
  return (
    <div>
      <img src={`https://source.unsplash.com/collection/12s/1920x700`} alt="Photos" />
      <div className="container">
        <div className="py-5">
          <h1 className="display-4 mb-3">Title</h1>
          <p className="lead">Body</p>
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
