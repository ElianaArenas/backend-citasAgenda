const Multa = require('../models/Multa');
const multaCtrl = {};

multaCtrl.createMulta = async (req, res) => {
  try {
    const multa = await Multa.create(req.body);

    return res.status(200).json({
      multa,
      message: 'Multa creada'
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Error en la solicitud',
      error: error.message
    })
  }
}

module.exports = multaCtrl;