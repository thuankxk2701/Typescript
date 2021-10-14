import React from 'react';
type ArticleImageProps = {
  image: any;
  type: string;
  typeClass: string;
};
const ArticleImage: React.FC<ArticleImageProps> = ({
  image,
  type,
  typeClass,
}) => {
  const randomImg = Math.ceil?.(Math.random() * 24) as number;
  let srcImg: string, typeAlt: string;
  if (type === 'image') {
    srcImg = image[`image-${randomImg}`];
    typeAlt = 'ImagePhoto';
  } else {
    srcImg = image[type];
    typeAlt = 'IconPhoto';
  }

  return <img src={srcImg} alt={typeAlt} className={typeClass} />;
};

export default ArticleImage;
