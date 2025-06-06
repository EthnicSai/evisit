const Card = require('../models/Card');
const QRCode = require('qrcode');
const path = require('path');

// Add a new card
const addCard = async (req, res) => {
  try {
    const { name, age, qualification, designation, phone, email, userId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    // Create card without QR code first
    const newCard = new Card({
      name,
      age,
      qualification,
      designation,
      phone,
      email,
      imageUrl,
      qrCode: '',
      userId
    });

    // Save to generate _id
    await newCard.save();

    // Generate QR using the card's ID
    const qrCode = await QRCode.toDataURL(newCard._id.toString());

    // Update card with QR code
    newCard.qrCode = qrCode;
    await newCard.save();

    res.status(200).json(newCard);
  } catch (err) {
    console.error('Error adding card:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete a card
const deleteCard = async (req, res) => {
  try {
    const cardId = req.params.id;
    const deletedCard = await Card.findByIdAndDelete(cardId);

    if (!deletedCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get cards for a user
const getCards = async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.params.userId });
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get a single card by ID
const getCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Download QR code
const downloadQR = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const qrCodePath = path.join(__dirname, `../uploads/qr-${req.params.id}.png`);
    await QRCode.toFile(qrCodePath, card._id.toString());
    res.download(qrCodePath);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Copy existing card to another user
const addExistingCardToUser = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { userId } = req.body;

    const originalCard = await Card.findById(cardId);
    if (!originalCard) {
      return res.status(404).json({ error: 'Original card not found' });
    }

    // Create new card instance
    const newCard = new Card({
      name: originalCard.name,
      age: originalCard.age,
      qualification: originalCard.qualification,
      designation: originalCard.designation,
      phone: originalCard.phone,
      email: originalCard.email,
      imageUrl: originalCard.imageUrl,
      qrCode: '',
      userId
    });

    await newCard.save();

    // Generate QR using new card ID
    newCard.qrCode = await QRCode.toDataURL(newCard._id.toString());
    await newCard.save();

    res.status(201).json({ message: 'Card copied to new user', card: newCard });
  } catch (err) {
    console.error('Error copying card:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  addCard,
  getCards,
  getCard,
  downloadQR,
  deleteCard,
  addExistingCardToUser
};
