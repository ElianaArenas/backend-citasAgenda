const { Router } = require('express');
const router = Router();

const {verifyToken, checkRolesExisted} = require('../middlewares');

const { createMulta } = require('../controllers/multa.controller');

router.route('/')
      .post([verifyToken, checkRolesExisted], createMulta)

module.exports = router;