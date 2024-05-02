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
    
    if (savedText1) setInputText1(savedText1);
    if (savedText2) setInputText2(savedText2);
  }, []);

  const handleInputChange = (event, setter) => {
    const newText = event.target.value;
    setter(newText);
    localStorage.setItem(setter === setInputText1 ? 'inputText1' : 'inputText2', newText);
  };

  const convertCase = (text, setter, convertFunc) => {
    setter(convertFunc(text));
    setButtonClicked((prevState) => ({ ...prevState, [setter === setInputText1 ? 'uppercase1' : 'uppercase2']: true }));
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setMessage(`Text "${text}" copied!`);
    setTimeout(() => {
      setMessage('');
    }, 500);
  };

  const renderCopyButton = (text, buttonText) => (
    <div>
      <button onClick={() => handleCopy(text)} style={{ ...buttonStyle, backgroundColor: buttonClicked[text] ? 'green' : '#007bff' }}>{buttonText}</button>
    </div>
  );

  const renderCaseButtons = (buttonName, buttonText) => (
    <div>
      <button onClick={() => convertCase(inputText1, setInputText1, buttonText === 'Convert to UPPER' ? text => text.toUpperCase() : buttonText === 'Convert to lowercase' ? text => text.toLowerCase() : text => text.replace(/\b\w/g, char => char.toUpperCase()))} style={{ ...buttonStyle, backgroundColor: buttonClicked[buttonName] ? 'green' : '#007bff' }}>{buttonText}</button>
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100vh', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {renderCopyButton('copy1', ' ● ')}
        {renderCopyButton('copy2', 'BLACKED')}
        {renderCopyButton('copy3', 'TUSHY')}
      </div>
      {renderCopyButton('copy4', 'Copy inputted text', inputText1 + ' ' + inputText2)}

      <textarea
        value={inputText1}
        onChange={(event) => handleInputChange(event, setInputText1)}
        style={{ ...textareaStyle, fontSize: '30px', fontWeight: 'bold' }}
      />
      <div>
        {renderCaseButtons('uppercase1', 'Convert to UPPER')}
        {renderCaseButtons('lowercase1', 'Convert to lowercase')}
        {renderCaseButtons('titlecase1', 'Convert to Title Case')}
      </div>

      <textarea
        value={inputText2}
        onChange={(event) => handleInputChange(event, setInputText2)}
        style={textareaStyle}
      />
      <div>
        {renderCaseButtons('uppercase2', 'Convert to UPPER')}
        {renderCaseButtons('lowercase2', 'Convert to lowercase')}
        {renderCaseButtons('titlecase2', 'Convert to Title Case')}
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

const textareaStyle = {
  margin: '10px',
  padding: '10px',
  width: '100%',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
};

export default App;
