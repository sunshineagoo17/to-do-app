import { useState } from 'react';
import './Input.scss'; 

const Input = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && text.trim() !== '') {
      onAddTodo(text.trim());
      setText('');
    }
  };

  return (
    <input
      type="text"
      className="input" 
      placeholder="What needs to be done?"
      value={text}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Input;
