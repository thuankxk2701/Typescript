import React from 'react';
import ArticleColumn from './ArticleColumn';
const ArticleRow: React.FC = () => {
  return (
    <>
      <ul className='article--row'>
        <h1 className='article--title'>Refined Cotton Chair</h1>
        <ArticleColumn />
      </ul>
      <ul className='article--row'>
        <h1 className='article--title'>Refined Cotton Chair</h1>
        <ArticleColumn />
      </ul>
    </>
  );
};
export default ArticleRow;
