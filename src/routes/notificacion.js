const { Router } = require('express');
const router = Router();

const {verifyToken, checkRolesExisted} = require('../middlewares');

const { createNotification, updateNotification, getNotifications, getNotification } = require('../controllers/notificacion.controller');

router.route('/')
      .get([verifyToken, checkRolesExisted], getNotifications)
      .post([verifyToken, checkRolesExisted], createNotification)

router.route('/:userId')
      .get([verifyToken, checkRolesExisted], getNotification)
      .put([verifyToken, checkRolesExisted], updateNotification)

module.exports = router;