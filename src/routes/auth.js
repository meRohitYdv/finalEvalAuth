const router = require('express').Router();
const { validateRequest } = require('../middlewares/auth');
const { authenticateUser, verifyJWT } = require('../controllers/auth');

router.post('/authenticate', validateRequest, authenticateUser);
router.post('/verifyJWT', verifyJWT);

module.exports = router;