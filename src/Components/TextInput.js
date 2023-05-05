import { useState } from 'react';
import './TextInput.css';

function TextInput(props) {
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSend() {
    if (inputValue.trim() !== '') {
      props.onSend(inputValue);
      setInputValue('');
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <div className="user-text-input">
      <input
        type="text"
        id="my-input"
        placeholder="Enter your text here"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor="my-input" style={{ display: 'none' }}>
        Enter your text here
      </label>
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default TextInput;