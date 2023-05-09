const { Router } = require('express');
const router = Router();
const { verifyToken } = require("../middlewares");

const {
  edit
} = require("../controllers/imgEmpresa.controller");

router.route("/:id")
.put([verifyToken], edit);

module.exports = router;