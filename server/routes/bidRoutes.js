const express = require('express');
const router = express.Router();
const { submitBid, getBidsForGig, hireBid } = require('../controllers/bidController');
const { protect } = require('../middleware/auth');

router.post('/', protect, submitBid);
router.get('/:gigId', protect, getBidsForGig);
router.patch('/:bidId/hire', protect, hireBid);

module.exports = router;
