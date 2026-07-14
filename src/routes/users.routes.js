const { Router } = require('express');
const controller = require('../controllers/users.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { createUserSchema } = require('../schemas/users.schema');

const router = Router();

router.get('/users', asyncHandler(controller.findAll));
router.get('/users/:id', asyncHandler(controller.findOne));
router.post('/users', validate(createUserSchema), asyncHandler(controller.create));
router.delete('/users/:id', auth, asyncHandler(controller.destroy));

module.exports = router;