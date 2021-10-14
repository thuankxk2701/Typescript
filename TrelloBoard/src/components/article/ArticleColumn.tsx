import React from 'react';
import data from '../server/data/data.json';
const ArticleColumn: React.FC = () => {
  return (
    <>
      <div className='article--scroll'>
        <li className='article--box' draggable='true'>
          <span className='article--box__title'>
            Principal Assurance Officer
          </span>
          <hr />
          <div className='article--box__middle'>
            <img
              src={data.face['image-1']}
              alt='ImagePhoto'
              className='middle__article-image'
            />
            <div className='middle__article-text'>
              <h1>Johnnie Goyette</h1>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aliquam, error. Eveniet corporis aut
              </span>
            </div>
          </div>
          <hr />
          <div className='article--box__footer'>
            <div className='article--box__footer--left'>
              <img
                src={data.icons['icon-pal']}
                alt='IconPhoto'
                className='footer--icon'
              />
              <img
                src={data.face['image-2']}
                alt='ImagePhoto'
                className='footer__left--image'
              />
              <img
                src={data.face['image-3']}
                alt='ImagePhoto'
                className='footer__left--image'
              />
              <img
                src={data.face['image-4']}
                alt='ImagePhoto'
                className='footer__left--image'
              />
            </div>
            <div className='article--box__footer--right'>
              <img
                src={data.icons['icon-del']}
                alt='IconDelPhoto'
                className='footer--icon'
              />
              <img
                src={data.face['image-5']}
                alt='IconPhoto'
                className='footer__left--image'
              />
            </div>
          </div>
        </li>
      </div>
    </>
  );
};

export default ArticleColumn;
