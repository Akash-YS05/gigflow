const express = require('express');
const router = express.Router();
const { 
  getGigs, 
  getGig, 
  createGig, 
  getMyGigs,
  getMyBidGigs 
} = require('../controllers/gigController');
const { protect } = require('../middleware/auth');

router.get('/', getGigs);
router.get('/my-gigs', protect, getMyGigs);
router.get('/my-bids', protect, getMyBidGigs);
router.get('/:id', getGig);
router.post('/', protect, createGig);

module.exports = router;
