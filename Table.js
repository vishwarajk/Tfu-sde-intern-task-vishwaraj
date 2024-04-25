import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Table = () => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    axios.get('/snippets').then((response) => {
      setSnippets(response.data);
    });
  }, []);

  return (
    // ... (render table)
  );
};

export default Table;
