const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const customerController = require('../controllers/customerController');

// Account Controller Routes
router.post('/checkPassword', accountController.checkPassword);
router.post('/checkEmailExist', accountController.checkEmailExist);
router.post('/checkEmailMatch', accountController.checkEmailMatch);
router.post('/validateAccountLogin', accountController.validateAccountLogin);
router.put('/editUserAccount/:id', accountController.editUserAccount);
router.delete('/deleteUserAccount/:id', accountController.deleteUserAccount);

// Customer Controller Routes
router.post('/createCustomer', customerController.createCustomer);

module.exports = router;
