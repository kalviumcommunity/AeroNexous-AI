const express = require('express');
const router = express.Router();    
const { registerOrLoginUser, getProfile, editProfile  } = require('../controllers/usercontroller');
const authMiddleware = require('../middleware/authenticate');
router.post('/register', registerOrLoginUser);
router.get('/profile', authMiddleware, getProfile);
router.put('/editprofile', authMiddleware, editProfile);
module.exports = router;