const express = require('express');
const router = express.Router();
const customerRatingController = require('../controllers/customerRatingController');

router.post('/create', customerRatingController.createCustomerRating);
router.get('/display', customerRatingController.displayCustomerRating);
router.put('/update', customerRatingController.updateCustomerRating);
router.delete('/delete', customerRatingController.deleteCustomerRating);

module.exports = router;
