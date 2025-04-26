const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const multer = require('multer');

// Setup multer for file upload
const upload = multer({ dest: 'uploads/' });

router.post('/addCard', upload.single('image'), cardController.addCard);
router.get('/getCards/:userId', cardController.getCards);
router.get('/getCard/:id', cardController.getCard);
router.get('/downloadQR/:id', cardController.downloadQR);
router.delete('/deleteCard/:id', cardController.deleteCard);

module.exports = router;
