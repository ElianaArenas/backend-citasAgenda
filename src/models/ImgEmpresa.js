const { Schema, model } = require('mongoose');
const config = require("../config");

const ImgempresaSchema = new Schema({
    imagen: String,
    tipo: String,
    ver: Boolean,
    presentar: Boolean,
    titulo: String,
    descripcion: String
    }, {
    timestaps: true
});

ImgempresaSchema.methods.setImagen = function setImagen (filename, type, description, titulo) {
    const {local, host, port} = config
    this.tipo = type;
    this.descripcion = description;
    this.titulo = titulo;
    if (local == 1){
        //el aplicativo se encuentra de manera local, no en un servidor remoto
        this.imagen = `${host}:${port}/publicEmpresa/${filename}`
      } else {
        //el aplicativo se encuentra en un servidor remoto como heroku
        this.imagen = `${host}/publicEmpresa/${filename}`
      }
    }

module.exports = model('ImgEmpresa', ImgempresaSchema);