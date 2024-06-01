
import React from 'react';
import './CustomModal.css';

const CustomModal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className='primaryText'>{title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          {children}<br/>
        </div><br/>
        
      </div>
    </div>
  );
};

export default CustomModal;