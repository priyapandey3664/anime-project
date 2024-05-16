import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type='text'
      placeholder='Search for anime characters...'
      onChange={(e) => onSearch(e.target.value)}
      style={{
        margin: '20px auto',
        display: 'block',
        width: '50%',
        padding: '10px',
      }}
    />
  );
};

export default SearchBar;
