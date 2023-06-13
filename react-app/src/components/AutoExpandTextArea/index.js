import React, { useState, useRef, useEffect } from 'react';
import './AutoExpandTextArea.css';

const AutoExpandTextArea = ({ text, onTextChange }) => {
  const [textareaText, setTextareaText] = useState(text);
  const textareaRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setTextareaText(value);
    adjustTextareaHeight();
    onTextChange(value); 
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    setTextareaText(text); 
    adjustTextareaHeight();

    
  }, [text]);

  return (
    <div className="expandtextarea-container">
      <div className="expandtextarea-flex">
        <div className="expandtextarea-text-display memo-text"></div>
        <textarea
          ref={textareaRef}
          value={textareaText}
          onChange={handleInputChange}
          className="expandtextarea-textarea"
        ></textarea>
      </div>
    </div>
  );
};

export default AutoExpandTextArea;
