const express = require('express');
const router = express.Router();
const shopManagerController = require('../controllers/shopManagerController');

router.post('/create', shopManagerController.createShopManager);
router.get('/get', shopManagerController.getManager);
router.put('/edit', shopManagerController.editManagerProfile);
router.delete('/delete', shopManagerController.deleteManagerAccount);

module.exports = router;
