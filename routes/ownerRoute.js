const express = require('express');
const router = express.Router();
const shopOwnerController = require('../controllers/shopOwnerController');

router.post('/create', shopOwnerController.createShopOwner);
router.get('/read', shopOwnerController.readOwner);
router.put('/update', shopOwnerController.updateOwner);
router.delete('/delete', shopOwnerController.deleteOwner);

module.exports = router;
