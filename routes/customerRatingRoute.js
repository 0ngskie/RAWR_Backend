const express = require('express');
const router = express.Router();
const customerRatingController = require('../controllers/customerRatingController');

//create
router.post('/create', customerRatingController.createCustomerRating);

//read
router.get('/', customerRatingController.displayAllComments);
router.get('/get/:shop_id', customerRatingController.displayShopCustomerRating);

// Under maintenance
router.get('/get/average/:user_id', customerRatingController.getUserAverageRating);

//update
router.put('/update/:id', customerRatingController.updateCustomerStatus);

//delete
router.delete('/delete/:id', customerRatingController.deleteCustomerRating);

module.exports = router;
