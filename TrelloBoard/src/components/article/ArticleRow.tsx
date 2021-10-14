import React from 'react';
import ArticleColumn from './ArticleColumn';
import data from '../server/data/data.json';
const ArticleRow: React.FC = () => {
  return (
    <>
      {data.row.map((row) => (
        <ul className='article--row'>
          <h1 className='article--title'>{row.title}</h1>
          <ArticleColumn data={data} itemColumn={row.item} />
        </ul>
      ))}
    </>
  );
};
export default ArticleRow;
