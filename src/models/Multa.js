const { Schema, model } = require('mongoose');

const multaSchema = new Schema(
  {
      usuario: String,
      tipo: String,
      valor: Number,
      activo: Boolean
  },
  {
      versionKey: false,
  }
  );
  module.exports = model('Multa', multaSchema);