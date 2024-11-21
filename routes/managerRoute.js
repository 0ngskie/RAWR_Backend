const express = require('express');
const router = express.Router();
const shopManagerController = require('../controllers/shopManagerController');

router.post('/create', shopManagerController.createShopManager);
router.get('/read', shopManagerController.readManager);
router.put('/update', shopManagerController.updateManager);
router.delete('/delete', shopManagerController.deleteManager);

module.exports = router;
