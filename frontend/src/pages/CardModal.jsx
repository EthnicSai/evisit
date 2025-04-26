import React from 'react';
import '../styles/CardModal.css';

const CardModal = ({ card, closeModal, handleDelete }) => {
  if (!card) return null;

  const onDelete = () => {
    if (window.confirm(`Are you sure you want to delete the card of ${card.name}?`)) {
      handleDelete(card._id);
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>X</button>
        <h3>{card.name}</h3>
        {card.imageUrl ? (
          <img 
            src={card.imageUrl ? `http://localhost:5000${card.imageUrl}` : ''} 
            alt={card.name} 
            className="card-image" 
          />
        ) : (
          <p>No image available</p>
        )}
        <p>Age: {card.age}</p>
        <p>Qualification: {card.qualification}</p>
        <p>Designation: {card.designation}</p>
        <p>Phone: {card.phone}</p>
        <p>Email: {card.email}</p>
        <div className="qr-container">
          <h4>QR Code:</h4>
          <img src={card.qrCode} alt="QR Code" className="qr-image" />
        </div>

        {/* Delete Button */}
        <button className="delete-btn" onClick={onDelete}>Delete Card</button>
      </div>
    </div>
  );
};

export default CardModal;
