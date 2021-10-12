import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className='clearfix'>
      <div className='pull-left buttons'>
        <div>
          <Link title='Add New' to='/' className='button add'>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Link>
          <Link title='Search' to='/search' className='button search'>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
