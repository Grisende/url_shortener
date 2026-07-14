const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const { loginLimiter } = require('../middlewares/rateLimiter');

const router = Router();

router.post('/login', loginLimiter, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

module.exports = router;