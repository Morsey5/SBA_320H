import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WOD from './WOD/words';
import definition from './components/definition';


const App = () => {
  const [definition, setDefinition] = useState('');
  const [WOD, setWordOfTheDay] = useState('');

  useEffect(() => {
    // Fetch definition from WordsAPI
    axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/<word>')
      .then(response => {
        const firstDefinition = response.data.definitions[0]?.definition || 'No definition found';
        setDefinition(firstDefinition);
      })
      .catch(error => {
        console.error('Error fetching definition:', error);
      });

    // Fetch word of the day from Word of the Day API
    axios.get('https://word-of-the-day2.p.rapidapi.com/word/today', {
      headers: {
        
      },
    })
      .then(response => {
        const word = response.data.word || 'No word found';
        setWordOfTheDay(word);
      })
      .catch(error => {
        console.error('Error fetching word of the day:', error);
      });
  }, []);

  return (
    <div>
      <h1>Word of the Day: {WOD}</h1>
      <p>Definition: {definition}</p>
    </div>
  );
};

export default App;