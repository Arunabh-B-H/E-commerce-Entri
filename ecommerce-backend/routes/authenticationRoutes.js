const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/authentication');

router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;
