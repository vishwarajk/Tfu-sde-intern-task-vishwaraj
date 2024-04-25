import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('');
  const [stdin, setStdin] = useState('');
  const [sourceCode, setSourceCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/submit', {
      username,
      language,
      stdin,
      sourceCode,
    });

    setUsername('');
    setLanguage('');
    setStdin('');
    setSourceCode('');
  };

  return (
    // ... (render form)
  );
};

export default Form;
