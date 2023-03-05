const Notificacion = require("../models/Notificacion");
const  sendMail = require("../utils/send-email");
const notificacionCtrl = {};

notificacionCtrl.createNotification = async (req, res) => {
  try {
    const notificacion = await Notificacion.create(req.body);

    sendMail('Notificación cancelar turno',
     `
     Reciba un cordial saludo <b>Sr</b> Admin, junto con saludar se notifica que:<br><br>

     El usuario ${req.body.user} desea cancelar el turno: <br><br>
       <b> El dia: </b> ${req.body.fechaTurno} <br>
       <b> A la hora: </b>${req.body.horaTurno} <br>
       <b> Justificación: </b> ${req.body.justificacion} <br><br>

     Por favor revisar plataforma para confirmar cancelación.
     `,
      'elianaarenasm@gmail.com'
     )

    return res.status(200).json({
      notificacion,
      message: 'Notificación creada'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error en la solicitud',
      error: error.message
    })
  }
}

notificacionCtrl.updateNotification = async (req, res) => {
  try {

    console.log(req.body)
    const notificacion = await Notificacion.updateOne({ _id: req.params.userId}, req.body);

    if(!notificacion){
      return res.status(400).json({
        message: 'No se encuentra la notificación'
      });
    }

    return res.status(200).json({
      message: 'Successful request',
      notificacion
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error en la solicitud',
      error: error.message
    })
  }
}

notificacionCtrl.getNotifications = async (req, res) => {
  try {
    const notificaciones = await Notificacion.find();

    return res.status(200).json({
      notificaciones
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error en la solicitud',
      error: error.message
    })
  }
}

notificacionCtrl.getNotification = async (req, res) => {
  try {
    const notificacion = await Notificacion.find({ user: req.params.userId});

    return res.status(200).json({
      notificacion
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error en la solicitud',
      error: error.message
    })
  }
}

module.exports = notificacionCtrl;