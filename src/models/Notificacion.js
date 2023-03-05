const { Schema, model } = require('mongoose');

const notificacionSchema = new Schema({
   userId: String,
   justificacion: String,
   fechaCreacion: {
        type:Date,
        default: Date.now
    },
   fechaTurno: Date,
   horaTurno: String,
   indiceHora: Number,
   diaTurno: String,
   idHorario: String,
   activo: Boolean
});

module.exports = model('Notificacion', notificacionSchema);