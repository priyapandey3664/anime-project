import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchCharacters = (query, page) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError('');
      try {
        const limit = 15;
        const response = await axios.get(
          `https://api.jikan.moe/v4/characters`,
          {
            params: {
              page,
              limit,
              q: query,
              order_by: 'favorites',
              sort: 'desc',
            },
          }
        );
        setCharacters(response.data.data);
        setTotalPages(Math.ceil(response.data.pagination.items.total / limit));
      } catch (err) {
        setError('Failed to fetch characters');
      }
      setLoading(false);
    };

    fetchCharacters();
  }, [query, page]);

  return { characters, loading, error, totalPages };
};

export default useFetchCharacters;
