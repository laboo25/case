import React, { useEffect, useState } from "react";
import starList from "../starname.json";
import CopyButton from "./CopyButton";
import "./starModal.css";

const StarNameModal = ({ onRightClick, onClose }) => {
  const [starname, setStarname] = useState([]);

  useEffect(() => {
    setStarname(starList.starname || []);
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {starname.map((star, index) => (
          <CopyButton key={index} value={star} onRightClick={onRightClick}>
            {star}
          </CopyButton>
        ))}
      </div>
    </div>
  );
};

export default StarNameModal;
