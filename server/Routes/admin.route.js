const express = require('express');
const router = express.Router();

const loginRoutes = require('../Controllers/admin.Controller');

//login mess
router.post('/login', loginRoutes.adminLogin);

module.exports = router;