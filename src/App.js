// src/App.js
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import useFetchCharacters from './hooks/useFetchCharacters';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { characters, loading, error, totalPages } = useFetchCharacters(
    query,
    page
  );

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1); // Reset to the first page for new search
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleBack = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className='App'>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {characters.length === 0 && !loading && !error && (
        <p>No results found.</p>
      )}
      <div className='character-list'>
        {characters.map((character) => (
          <div key={character.mal_id} className='character-item'>
            <img src={character.images.jpg.image_url} alt={character.name} />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
      <div className='pagination'>
        <button onClick={handleBack} disabled={page === 1}>
          Back
        </button>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
