import React from 'react';
import ArticleImage from './ArticleImage';
type ArticleColumnProps = {
  data: any;
  itemColumn: {
    id: string;
    name: string;
    information: string;
  }[];
};
const ArticleColumn: React.FC<ArticleColumnProps> = ({ data, itemColumn }) => {
  const HandleChange = (event: React.ChangeEvent<HTMLLIElement>) => {
    console.log(this);
  };
  return (
    <>
      <div className='article--scroll'>
        {itemColumn.map((column, index) => (
          <li
            key={index}
            className='article--box'
            draggable='true'
            id={column.id}
            onChange={HandleChange.bind(this)}
          >
            <span className='article--box__title'>
              Principal Assurance Officer
            </span>
            <hr />
            <div className='article--box__middle'>
              <ArticleImage
                image={data.face}
                type={'image'}
                typeClass={'middle__article-image'}
              />

              <div className='middle__article-text'>
                <h1>{column.name}</h1>
                <span>{column.information}</span>
              </div>
            </div>
            <hr />
            <div className='article--box__footer'>
              <div className='article--box__footer--left'>
                <ArticleImage
                  image={data.icons}
                  type={'icon-pal'}
                  typeClass={'footer--icon'}
                />
                <ArticleImage
                  image={data.face}
                  type={'image'}
                  typeClass={'footer__left--image'}
                />

                <ArticleImage
                  image={data.face}
                  type={'image'}
                  typeClass={'footer__left--image'}
                />
                <ArticleImage
                  image={data.face}
                  type={'image'}
                  typeClass={'footer__left--image'}
                />
              </div>
              <div className='article--box__footer--right'>
                <ArticleImage
                  image={data.icons}
                  type={'icon-del'}
                  typeClass={'footer--icon'}
                />
                <ArticleImage
                  image={data.face}
                  type={'image'}
                  typeClass={'footer__left--image'}
                />
              </div>
            </div>
          </li>
        ))}
      </div>
    </>
  );
};

export default ArticleColumn;
