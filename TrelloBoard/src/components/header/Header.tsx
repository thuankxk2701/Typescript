import React from 'react';
import HeaderIcon from './HeaderIcon';
const Header: React.FC = () => {
  return (
    <header className='header'>
      <HeaderIcon />
      <span className='header--text'>Welcome to Trello Board๐๏ธ๐๏ธ๐๏ธ</span>
    </header>
  );
};
export default Header;
