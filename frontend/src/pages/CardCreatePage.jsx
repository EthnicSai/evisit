import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/CardCreatePage.css';

const CardCreatePage = () => {
  const [cardData, setCardData] = useState({
    name: '',
    age: '',
    qualification: '',
    designation: '',
    phone: '',
    email: '',
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB');
      return;
    }
    setImage(file);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!image) {
      setError('Please upload an image');
      return;
    }

    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append('image', image);
    Object.entries(cardData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('userId', userId);

    try {
      await axios.post(`${API_URL}/api/cards/addCard`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      navigate(`/cardManager/${userId}`);
    } catch (error) {
      console.error('Error creating card', error);
      setError(error.response?.data?.message || 'Failed to create card');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card-create-container">
        <h2>Create New Card</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={cardData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="age"
              value={cardData.age}
              onChange={handleChange}
              placeholder="Age"
              min="18"
              max="99"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="qualification"
              value={cardData.qualification}
              onChange={handleChange}
              placeholder="Qualification"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="designation"
              value={cardData.designation}
              onChange={handleChange}
              placeholder="Designation"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phone"
              value={cardData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={cardData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </div>

          <div className="form-group file-upload">
            <label htmlFor="image-upload">Upload Profile Image:</label>
            <input 
              id="image-upload"
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
          </div>
          
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Card'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CardCreatePage;
