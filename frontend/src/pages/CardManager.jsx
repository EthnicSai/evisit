import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CardModal from './CardModal'; // Import the CardModal component
import '../styles/CardManager.css';

const CardManager = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cards/getCards/${userId}`);
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
        setError('Failed to load cards. Please try again later.');
      }
    };

    if (userId) {
      fetchCards();
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleViewCards = () => {
    navigate(`/cards/view/${userId}`);
  };

  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const handleDelete = async (cardId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/cards/deleteCard/${cardId}`);
      if (response.status === 200) {
        setCards(cards.filter(card => card._id !== cardId));
        alert('Card deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      alert('Failed to delete card. Please try again.');
    }
  };

  return (
    <div className="card-manager-container">
      <h2>Your Cards</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="button-group">
        <button onClick={() => navigate(`/cards/create/${userId}`)}>Create New Card</button>
        {/* <button onClick={handleViewCards}>View Cards</button> */}
        <button onClick={handleLogout}>Logout</button>
      </div>

      {cards.length === 0 ? (
        <p>No cards found.</p>
      ) : (
        <div className="card-list">
          {cards.map((card) => (
            <div key={card._id} className="card-preview">
              <h3>{card.name}</h3>
              <p>Age: {card.age}</p>
              <p>Qualification: {card.qualification}</p>
              <p>Designation: {card.designation}</p>
              <button onClick={() => openModal(card)}>View Card</button>
            </div>
          ))}
        </div>
      )}

      {selectedCard && (
        <CardModal card={selectedCard} closeModal={closeModal} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default CardManager;
