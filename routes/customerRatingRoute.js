const express = require('express');
const router = express.Router();
const customerRatingController = require('../controllers/customerRatingController');

//create
router.post('/create', customerRatingController.createCustomerRating);

//read
router.get('/', customerRatingController.displayAllComments);
router.get('/get/:shop_id', customerRatingController.displayShopCustomerRating);

//update
router.put('/update/:shop_id', customerRatingController.updateCustomerRating);

//delete
router.delete('/delete/:id', customerRatingController.deleteCustomerRating);

module.exports = router;
