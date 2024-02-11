import React, { useState, useEffect } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
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
    const savedText = localStorage.getItem('inputText');
    if (savedText) {
      setInputText(savedText);
    }
  }, []); // Empty dependency array ensures this effect only runs once, on component mount

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
    localStorage.setItem('inputText', newText); // Save input text to local storage
  };

  const convertToUpperCase = () => {
    setInputText(inputText.toUpperCase());
  };

  const convertToLowerCase = () => {
    setInputText(inputText.toLowerCase());
  };

  const convertToTitleCase = () => {
    setInputText(inputText.replace(/\b\w/g, (char) => char.toUpperCase()));
  };

  const handleCopy = (buttonName) => {
    navigator.clipboard.writeText(inputText); // Copy input text to clipboard
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

  const handlePaste = async () => {
    const textFromClipboard = await navigator.clipboard.readText(); // Read text from clipboard
    setInputText(textFromClipboard);
    localStorage.setItem('inputText', textFromClipboard); // Save pasted text to local storage
    setMessage('Text pasted!');
    setTimeout(() => {
      setMessage('');
    }, 3000); // Hide message after 3 seconds
  };

  return (
    <div style={{ width: '100%', height: '100vh', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div>
          <h2 style={{ margin: '0 10px', fontSize: '24px' }}>●</h2>
          <button onClick={() => handleCopy('copy1')} style={{ ...buttonStyle, backgroundColor: buttonClicked.copy1 ? 'green' : '#007bff' }}>Copy</button>
        </div>
        <div>
          <h2 style={{ margin: '0 10px', fontSize: '24px' }}>BLACKED</h2>
          <button onClick={() => handleCopy('copy2')} style={{ ...buttonStyle, backgroundColor: buttonClicked.copy2 ? 'green' : '#007bff' }}>Copy</button>
        </div>
        <div>
          <h2 style={{ margin: '0 10px', fontSize: '24px' }}>TUSHY</h2>
          <button onClick={() => handleCopy('copy3')} style={{ ...buttonStyle, backgroundColor: buttonClicked.copy3 ? 'green' : '#007bff' }}>Copy</button>
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <div>
          <button onClick={() => handleCopy('copy4')} style={{ ...buttonStyle, backgroundColor: buttonClicked.copy4 ? 'green' : '#007bff' }}>Copy inputted text</button>
        </div>
      </div>
      
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
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
        <button onClick={() => handleCopy('uppercase')} style={{ ...buttonStyle, backgroundColor: buttonClicked.uppercase ? 'green' : '#007bff' }}>Convert to UPPERe</button>
        <button onClick={() => handleCopy('lowercase')} style={{ ...buttonStyle, backgroundColor: buttonClicked.lowercase ? 'green' : '#007bff' }}>Convert to lowercase</button>
        <button onClick={() => handleCopy('titlecase')} style={{ ...buttonStyle, backgroundColor: buttonClicked.titlecase ? 'green' : '#007bff' }}>Convert to Title Case</button>
      </div>
      <div style={{ position: 'fixed', top: '50px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'lightgreen', padding: '10px', borderRadius: '5px', display: message ? 'block' : 'none' }}>
        <p style={{ margin: '0', color: 'green' }}>{message}</p>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <div>
          <button onClick={() => handleCopy('copy4')} style={{ ...buttonStyle, backgroundColor: buttonClicked.copy4 ? 'green' : '#007bff' }}>Copy inputted text</button>
        </div>
      </div>
      
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
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
        <button onClick={() => handleCopy('uppercase')} style={{ ...buttonStyle, backgroundColor: buttonClicked.uppercase ? 'green' : '#007bff' }}>Convert to UPPERe</button>
        <button onClick={() => handleCopy('lowercase')} style={{ ...buttonStyle, backgroundColor: buttonClicked.lowercase ? 'green' : '#007bff' }}>Convert to lowercase</button>
        <button onClick={() => handleCopy('titlecase')} style={{ ...buttonStyle, backgroundColor: buttonClicked.titlecase ? 'green' : '#007bff' }}>Convert to Title Case</button>
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
