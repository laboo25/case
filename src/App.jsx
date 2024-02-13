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
    uppercase1: false,
    lowercase1: false,
    titlecase1: false,
    uppercase2: false,
    lowercase2: false,
    titlecase2: false,
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
    setButtonClicked((prevState) => ({ ...prevState, uppercase1: true }));
  };

  const convertToUpperCase2 = () => {
    setInputText2(inputText2.toUpperCase());
    setButtonClicked((prevState) => ({ ...prevState, uppercase2: true }));
  };

  const convertToLowerCase1 = () => {
    setInputText1(inputText1.toLowerCase());
    setButtonClicked((prevState) => ({ ...prevState, lowercase1: true }));
  };

  const convertToLowerCase2 = () => {
    setInputText2(inputText2.toLowerCase());
    setButtonClicked((prevState) => ({ ...prevState, lowercase2: true }));
  };

  const convertToTitleCase1 = () => {
    setInputText1(inputText1.replace(/\b\w/g, (char) => char.toUpperCase()));
    setButtonClicked((prevState) => ({ ...prevState, titlecase1: true }));
  };

  const convertToTitleCase2 = () => {
    setInputText2(inputText2.replace(/\b\w/g, (char) => char.toUpperCase()));
    setButtonClicked((prevState) => ({ ...prevState, titlecase2: true }));
  };

  const handleCopy1 = () => {
    navigator.clipboard.writeText(' ● ');
    setMessage('Text "hello" copied!');
    setButtonClicked((prevState) => ({ ...prevState, copy1: true }));
    setTimeout(() => {
      setMessage('');
      setButtonClicked((prevState) => ({ ...prevState, copy1: false }));
    }, 500);
  };

  const handleCopy2 = () => {
    navigator.clipboard.writeText('BLACKED');
    setMessage('Text from input 2 copied!');
    setButtonClicked((prevState) => ({ ...prevState, copy2: true }));
    setTimeout(() => {
      setMessage('');
      setButtonClicked((prevState) => ({ ...prevState, copy2: false }));
    }, 500);
  };

  const handleCopy4 = () => {
    const allText = inputText1 + ' ' + inputText2;
    navigator.clipboard.writeText(allText);
    setMessage('Text from inputs 1 and 2 copied!');
    setButtonClicked((prevState) => ({ ...prevState, copy4: true }));
    setTimeout(() => {
      setMessage('');
      setButtonClicked((prevState) => ({ ...prevState, copy4: false }));
    }, 500);
  };

  const renderCopyButton = (buttonName, buttonText, copyHandler) => (
    <div>
      <button onClick={copyHandler} style={{ ...buttonStyle, backgroundColor: buttonClicked[buttonName] ? 'green' : '#007bff' }}>{buttonText}</button>
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100vh', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {renderCopyButton('copy1', ' ● ', handleCopy1)}
        {renderCopyButton('copy2', 'BLACKED', handleCopy2)}
        {renderCopyButton('copy3', 'TUSHY')}
      </div>
      {renderCopyButton('copy4', 'Copy inputted text', handleCopy4)}

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
        <button onClick={convertToUpperCase1} style={{ ...buttonStyle, backgroundColor: buttonClicked.uppercase1 ? 'green' : '#007bff' }}>Convert to UPPER</button>
        <button onClick={convertToLowerCase1} style={{ ...buttonStyle, backgroundColor: buttonClicked.lowercase1 ? 'green' : '#007bff' }}>Convert to lowercase</button>
        <button onClick={convertToTitleCase1} style={{ ...buttonStyle, backgroundColor: buttonClicked.titlecase1 ? 'green' : '#007bff' }}>Convert to Title Case</button>
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
        <button onClick={convertToUpperCase2} style={{ ...buttonStyle, backgroundColor: buttonClicked.uppercase2 ? 'green' : '#007bff' }}>Convert to UPPER</button>
        <button onClick={convertToLowerCase2} style={{ ...buttonStyle, backgroundColor: buttonClicked.lowercase2 ? 'green' : '#007bff' }}>Convert to lowercase</button>
        <button onClick={convertToTitleCase2} style={{ ...buttonStyle, backgroundColor: buttonClicked.titlecase2 ? 'green' : '#007bff' }}>Convert to Title Case</button>
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
