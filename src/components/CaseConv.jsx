import React, { useState, useEffect } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [convertedText, setConvertedText] = useState('');

  useEffect(() => {
    // Load saved text from local storage when the component mounts
    const savedText = localStorage.getItem('inputText');
    if (savedText) {
      setInputText(savedText);
    }
  }, []);

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
    // Save the input text to local storage
    localStorage.setItem('inputText', newText);
  };

  const convertToUpperCase = () => {
    const upperCaseText = inputText.toUpperCase();
    setConvertedText(upperCaseText);
    // Save the converted text to local storage
    localStorage.setItem('convertedText', upperCaseText);
  };

  const convertToLowerCase = () => {
    const lowerCaseText = inputText.toLowerCase();
    setConvertedText(lowerCaseText);
    // Save the converted text to local storage
    localStorage.setItem('convertedText', lowerCaseText);
  };

  const convertToTitleCase = () => {
    const titleCaseText = inputText.replace(/\b\w/g, (char) => char.toUpperCase());
    setConvertedText(titleCaseText);
    // Save the converted text to local storage
    localStorage.setItem('convertedText', titleCaseText);
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <br />
      <button onClick={convertToUpperCase}>Convert to Uppercase</button>
      <button onClick={convertToLowerCase}>Convert to Lowercase</button>
      <button onClick={convertToTitleCase}>Convert to Title Case</button>
      <br />
      <div>Converted Text: {convertedText}</div>
    </div>
  );
}

export default App;
