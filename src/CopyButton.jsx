import React, { useState, useEffect } from "react";
import './copybtn.css';

const CopyButton = ({ value, children, onRightClick }) => {
  const [copied, setCopied] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    if (value.toLowerCase() === "lena anderson") {
      setBackgroundColor("linear-gradient(to right, #ee0979, #ff6a00)");
    } else {
      setBackgroundColor(generateRandomColor());
    }
  }, [value]);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000); // Hide the message after 2 seconds
    });
  };

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the default right-click menu
    if (onRightClick) {
      onRightClick(value); // Call the onRightClick function passed from the parent
    }
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={handleCopy}
        onContextMenu={handleContextMenu} // Handle right-click
        style={{ 
          padding: "5px 10px", 
          borderRadius: "20px", 
          background: backgroundColor,
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        {children}
      </button>
      {copied && (
        <span
          style={{
            position: "absolute",
            top: "-30px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "red",
            color: "white",
            padding: "5px 10px",
            borderRadius: "3px",
            fontSize: "12px",
            whiteSpace: "nowrap",
            opacity: 0,
            animation: "fadeInOut 2s",
            pointerEvents: "none"
          }}
        >
          Copied!
        </span>
      )}
    </div>
  );
};

export default CopyButton;
