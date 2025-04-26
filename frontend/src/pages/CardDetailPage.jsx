import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import '../styles/CardManager.css';

const CardDetailPage = () => {
  const [card, setCard] = useState(null); 
  const [error, setError] = useState(''); 
  const { cardId } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cards/getCard/${cardId}`);
        setCard(response.data);
      } catch (error) {
        console.error('Error fetching card:', error); 
        setError('Failed to load card details. Please try again later.');
      }
    };

    if (cardId) {
      fetchCard();
    }
  }, [cardId]);

  const handleBackToCards = () => {
    navigate(`/cards/manage/${card.userId}`); 
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/cards/deleteCard/${cardId}`);
      navigate(`/cards/manage/${card.userId}`);
    } catch (error) {
      console.error('Error deleting card:', error); 
      setError('Failed to delete card. Please try again later.');
    }
  };

  const handleEdit = () => {
    navigate(`/cards/edit/${cardId}`);
  };

  return (
    <div className="card-detail-container">
      <h2>Card Details</h2>
      {error && <p className="error-message">{error}</p>}

      {card ? (
        <div className="card-detail">
          <h3>{card.name}</h3>
          <p>Age: {card.age}</p>
          <p>Qualification: {card.qualification}</p>
          <p>Designation: {card.designation}</p>
          <p><strong>Bio:</strong> {card.bio}</p>

          <div className="card-images">
            <img src={card.imageUrl} alt={`${card.name} Image`} className="card-image" />
            <img src={card.qrCodeUrl} alt={`${card.name} QR Code`} className="qr-code" />
          </div>

          <div className="button-group">
            <button onClick={handleBackToCards}>Back to Cards</button>
            <button onClick={handleEdit}>Edit Card</button>
            <button onClick={handleDelete} className="delete-button">Delete Card</button>
          </div>
        </div>
      ) : (
        <p>Loading card details...</p>
      )}
    </div>
  );
};

export default CardDetailPage;
