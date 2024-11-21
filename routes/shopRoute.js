const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

router.post('/register', shopController.registerRepairShop);

router.get('/viewShopDetails', shopController.viewRepairShopDetails);
router.get('/viewPageStatus', shopController.validateShopPageStatus);
router.get('/locate', shopController.locateRepairShop);
router.get('/display', shopController.displayShopPage);
router.get('/shopRating/:shop_id', shopController.getShopAverageRating);

router.put('/updateRegisStatus', shopController.updateShopRegistrationStatus);
router.put('/updateRegisApplication', shopController.updateShopRegistrationDetails);
router.put('/update', shopController.updateShopPage);

router.delete('/delete', shopController.deleteRepairShop);

module.exports = router;
