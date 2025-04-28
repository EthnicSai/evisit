import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom'; // <-- Import Link here
import CardModal from './CardModal'; // Import the CardModal component
import '../styles/CardManager.css';

const CardManager = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cards/getCards/${userId}`);
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
        setError('Failed to load cards. Please try again later.');
      }
    };

    if (userId) {
      fetchCards();
    }
  }, [userId, API_URL]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const handleDelete = async (cardId) => {
    try {
      const response = await axios.delete(`${API_URL}/api/cards/deleteCard/${cardId}`);
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
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>
            <Link to="/">E-VisitCard</Link> {/* Make sure Link is used here */}
          </h1>
        </div>
        <div className="navbar-links">
          <button onClick={() => navigate(`/cards/create/${userId}`)}>Create New Card</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <h2>Your Cards</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="card-list">
        {cards.length === 0 ? (
          <p>No cards found.</p>
        ) : (
          cards.map((card) => (
            <div key={card._id} className="card-preview">
              <h3>{card.name}</h3>
              <p>Age: {card.age}</p>
              <p>Qualification: {card.qualification}</p>
              <p>Designation: {card.designation}</p>
              {card.imageUrl && (
                <img
                  src={`${API_URL}${card.imageUrl}`}
                  alt={`${card.name} Profile`}
                  className="card-image"
                />
              )}
              <button onClick={() => openModal(card)}>View Card</button>
              <button onClick={() => handleDelete(card._id)}>Delete</button>
            </div>
          ))
        )}
      </div>

      {selectedCard && (
        <CardModal card={selectedCard} closeModal={closeModal} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default CardManager;
