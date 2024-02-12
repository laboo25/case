import React, { useState, useEffect } from 'react';

function App() {
  const [inputText1, setInputText1] = useState('');
  const [inputText2, setInputText2] = useState('');
  const [message, setMessage] = useState('');
  const [buttonClicked, setButtonClicked] = useState({
    copy1: false,
    copy2: false,
    copy3: false,
    copy4: false,
    paste: false,
    uppercase: false,
    lowercase: false,
    titlecase: false,
  });

  useEffect(() => {
    const savedText1 = localStorage.getItem('inputText1');
    const savedText2 = localStorage.getItem('inputText2');
    
    if (savedText1) {
      setInputText1(savedText1);
    }

    if (savedText2) {
      setInputText2(savedText2);
    }
  }, []); // Empty dependency array ensures this effect only runs once, on component mount

  const handleInputChange1 = (event) => {
    const newText1 = event.target.value;
    setInputText1(newText1);
    localStorage.setItem('inputText1', newText1); // Save input text to local storage
  };

  const handleInputChange2 = (event) => {
    const newText2 = event.target.value;
    setInputText2(newText2);
    localStorage.setItem('inputText2', newText2); // Save input text to local storage
  };

  const convertToUpperCase1 = () => {
    setInputText1(inputText1.toUpperCase());
  };

  const convertToUpperCase2 = () => {
    setInputText2(inputText2.toUpperCase());
  };

  const convertToLowerCase1 = () => {
    setInputText1(inputText1.toLowerCase());
  };

  const convertToLowerCase2 = () => {
    setInputText2(inputText2.toLowerCase());
  };

  const convertToTitleCase1 = () => {
    setInputText1(inputText1.replace(/\b\w/g, (char) => char.toUpperCase()));
  };

  const convertToTitleCase2 = () => {
    setInputText2(inputText2.replace(/\b\w/g, (char) => char.toUpperCase()));
  };

  const handleCopy = (buttonName) => {
    const textToCopy = buttonName === 'copy1' ? inputText1 : inputText2;
    navigator.clipboard.writeText(textToCopy); // Copy input text to clipboard
    setMessage('Text copied!');
    setTimeout(() => {
      setMessage('');
    }, 3000); // Hide message after 3 seconds

    setButtonClicked((prevState) => ({
      ...prevState,
      [buttonName]: true,
    }));

    setTimeout(() => {
      setButtonClicked((prevState) => ({
        ...prevState,
        [buttonName]: false,
      }));
    }, 200); // Reset button click effect after 200ms
  };

  const renderCopyButton = (buttonName, labelText) => (
    <div>
      <h2 style={{ margin: '0 10px', fontSize: '24px' }}>{labelText}</h2>
      <button onClick={() => handleCopy(buttonName)} style={{ ...buttonStyle, backgroundColor: buttonClicked[buttonName] ? 'green' : '#007bff' }}>Copy</button>
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100vh', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {renderCopyButton('copy1', '●')}
        {renderCopyButton('copy2', 'BLACKED')}
        {renderCopyButton('copy3', 'TUSHY')}
      </div>
      {renderCopyButton('copy4', 'Copy inputted text')}

      <input
        type="text"
        value={inputText1}
        onChange={handleInputChange1}
        style={{
          margin: '10px',
          padding: '5px',
          width: '100%',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
       <div>
        <button onClick={convertToUpperCase1} style={{ ...buttonStyle, backgroundColor: buttonClicked.uppercase ? 'green' : '#007bff' }}>Convert to UPPER (1)</button>
        
        <button onClick={convertToLowerCase1} style={{ ...buttonStyle, backgroundColor: buttonClicked.lowercase ? 'green' : '#007bff' }}>Convert to lowercase (1)</button>
        
        <button onClick={convertToTitleCase1} style={{ ...buttonStyle, backgroundColor: buttonClicked.titlecase ? 'green' : '#007bff' }}>Convert to Title Case (1)</button>
        
      </div>
      <input
        type="text"
        value={inputText2}
        onChange={handleInputChange2}
        style={{
          margin: '10px',
          padding: '5px',
          width: '100%',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
       <div>
      <button onClick={convertToUpperCase2} style={{ ...buttonStyle, backgroundColor: buttonClicked.uppercase ? 'green' : '#007bff' }}>Convert to UPPER (2)</button>
        <button onClick={convertToLowerCase2} style={{ ...buttonStyle, backgroundColor: buttonClicked.lowercase ? 'green' : '#007bff' }}>Convert to lowercase (2)</button>
        <button onClick={convertToTitleCase2} style={{ ...buttonStyle, backgroundColor: buttonClicked.titlecase ? 'green' : '#007bff' }}>Convert to Title Case (2)</button>
      </div>
      
      <div style={{ position: 'fixed', top: '50px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'lightgreen', padding: '10px', borderRadius: '5px', display: message ? 'block' : 'none' }}>
        <p style={{ margin: '0', color: 'green' }}>{message}</p>
      </div>
    </div>
  );
}

const buttonStyle = {
  margin: '10px',
  padding: '8px 16px',
  backgroundColor: '#007bff',
  color: '#242424',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  outline: 'none',
};

export default App;
