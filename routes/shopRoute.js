const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

router.post('/register', shopController.registerRepairShop);
router.get('/validate', shopController.validateShopPageStatus);
router.get('/locate', shopController.locateRepairShop);
router.get('/display', shopController.displayShopPage);
router.put('/update', shopController.updateShopPage);
router.put('/updateRegister', shopControler.updateShopRegistration);
router.delete('/delete', shopController.deleteRepairShop);

module.exports = router;
