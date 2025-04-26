import React from 'react';

const CardPreview = ({ card }) => {
  return (
    <div className="card-preview">
      <h3>{card.name}</h3>
      <p>Age: {card.age}</p>
      <p>Qualification: {card.qualification}</p>
      <p>Designation: {card.designation}</p>
      <p>Phone: {card.phone}</p>
      <p>Email: {card.email}</p>

      {card.imageUrl && <img src={`http://localhost:5000${card.imageUrl}`} alt={card.name} className="card-image" />}
      
      <p>QR Code:</p>
      {card.qrCode && <img src={card.qrCode} alt="QR Code" className="qr-code" />}
    </div>
  );
};

export default CardPreview;
