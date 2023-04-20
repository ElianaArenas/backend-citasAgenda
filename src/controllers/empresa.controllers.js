const empresasCtrl = {};
const fs = require("fs");
const Empresa = require("../models/empresa");
const ImgEmp = require("../models/ImgEmpresa");
const { seleccionAleatoria, renovarHorarios, prueba } = require("../libs/politicas");

empresasCtrl.getEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.find(); //
    res.json(empresas);
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};
empresasCtrl.createEmpresa = async (req, res) => {
  try {
    const {
      title,
      descripcion,
      administrador,
      imagen,
      telefono1,
      telefono2,
      telefono3,
      logo,
      direccion,
      email,
      facebook,
      instagram,
      whatsapp,
      twitter,
      linkedin,
      youtube,
    } = req.body;
    const nuevaEmpresa = new Empresa({
      title,
      descripcion,
      administrador,
      imagen,
      telefono1,
      telefono2,
      telefono3,
      logo,
      direccion,
      email,
      facebook,
      instagram,
      whatsapp,
      twitter,
      linkedin,
      youtube,
      solNombre: "false",
      solDocumento: "false",
      solCodigo: "false",
      solDireccion: "false",
      solTelefono: "false",
      solTelefono2: "false",
      solEmail: "false",
      solIdFamiliar: "false",
      solImagen: "false",
      solFechaNacimiento: "false",
      solEstatura: "false",
      solGenero: "false",
      solBarrio: "false",
      solPeso: "false",
      solCategoria: "false",
      solTorneos: "false",
      solBrazoDominante: "false",
      editNombre: "false",
      editDocumento: "false",
      editCodigo: "false",
      editDireccion: "false",
      editTelefono: "false",
      editTelefono2: "false",
      editEmail: "false",
      editIdFamiliar: "false",
      editImagen: "false",
      editFechaNacimiento: "false",
      editEstatura: "false",
      editGenero: "false",
      editBarrio: "false",
      editPeso: "false",
      editCategoria: "false",
      editTorneos: "false",
      editBrazoDominante: "false",
      presentacion: "false",
      encabezado: "false",
      clima: "false",
      aleatorio: "false",
      
    });
    await nuevaEmpresa.save();
    console.log(nuevaEmpresa);
    //res.json({message:nuevaCita});
    res.json({ message: "empresa guardada" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

empresasCtrl.getEmpresa = async (req, res) => {
  try {
    const empresaFound = await Empresa.findOne({ _id: req.params.id });
    if (!empresaFound) return res.status(400).json({ message: "No se encontró la empresa especificada" });
    const empresa = await Empresa.findById(req.params.id);
    res.json({ message: empresa });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};
empresasCtrl.updateEmpresa = async (req, res) => {
  try {
    const empresaFound = await Empresa.findOne({ _id: req.params.id });
    if (!empresaFound) return res.status(400).json({ message: "No se encontró la empresa especificada" });
    console.log(req.params.id, req.body);
    const {
      title,
      descripcion,
      administrador,
      imagen,
      telefono1,
      telefono2,
      telefono3,
      logo,
      direccion,
      email,
      facebook,
      instagram,
      whatsapp,
      twitter,
      linkedin,
      youtube,
      presentacion,
      encabezado,
      clima
    } = req.body;
    await Empresa.findOneAndUpdate({ _id: req.params.id }, {
      $set: {
        title,
        descripcion,
        administrador,
        imagen,
        telefono1,
        telefono2,
        telefono3,
        logo,
        direccion,
        email,
        facebook,
        instagram,
        whatsapp,
        twitter,
        linkedin,
        youtube,
        presentacion,
        encabezado,
        clima
      }
    });
    res.json({ message: "empresa actualizado" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

empresasCtrl.updateEmpresaHorarioAleatorio = async (req, res) => {
  try {
    const empresaFound = await Empresa.findOne({ _id: req.params.id });
    if (!empresaFound) return res.status(400).json({ message: "No se encontró la empresa especificada" });
    console.log(req.params.id, req.body);
  
    const {
      aleatorio,
      tiempoMañana,
      tiempoTarde
    } = req.body;
    await Empresa.findOneAndUpdate({ _id: req.params.id  }, {
      $set: {
        intervaloTurnoAleatorioMañana: tiempoMañana,
        intervaloTurnoAleatorioTarde: tiempoTarde
      }
    })
    seleccionAleatoria(aleatorio);
  
    await Empresa.findOneAndUpdate({ _id: req.params.id  }, {
      $set: {
        aleatorio
      }
    });
    
    res.json({ message: "tipo de insercion de datos actualizado" }); 
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
  
};

empresasCtrl.updateEmpresaHorarioCancelar = async (req, res) => {
  try {
    const empresaFound = await Empresa.findOne({ _id: req.params.id });
    if (!empresaFound) return res.status(400).json({ message: "No se encontró la empresa especificada" });
    console.log(req.params.id, req.body);
  
    const {
      cancelar,
      horaAm,
      horaPm
    } = req.body;
    await Empresa.findOneAndUpdate({ _id: req.params.id  }, {
      $set: {
        cancelar,
        horaAm,
        horaPm
      }
    });
    res.json({ message: "cancelar solicitud actualizado" }); 
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};


empresasCtrl.updateEmpresaHorarioRenovar = async (req, res) => {
  try {
    const empresaFound = await Empresa.findOne({ _id: req.params.id });
    if (!empresaFound) return res.status(400).json({ message: "No se encontró la empresa especificada" });
    console.log(req.params.id, req.body);
    const {
      dia,
      hora,
    } = req.body;
    await Empresa.findOneAndUpdate({ _id: req.params.id  }, {
      $set: {
        diaRenovar: dia,
        horaRenovar: hora
      }
    })
    renovarHorarios(dia, hora);
    //prueba(dia, hora);
     res.json({ message: "dia y hora de renovacion actualizado" }); 
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};
empresasCtrl.updateEmpresaForm = async (req, res) => {
  try {
    const empresaFound = await Empresa.findOne({ _id: req.params.id });
    if (!empresaFound) return res.status(400).json({ message: "No se encontró la empresa especificada" });
    console.log(req.params.id, req.body);
    const {
      solNombre,
      solDocumento,
      solCodigo,
      solDireccion,
      solTelefono,
      solTelefono2,
      solEmail,
      solIdFamiliar,
      solImagen,
      solFechaNacimiento,
      solEstatura,
      solGenero,
      solBarrio,
      solPeso,
      solCategoria,
      solTorneos,
      solBrazoDominante,
      editNombre,
      editDocumento,
      editCodigo,
      editDireccion,
      editTelefono,
      editTelefono2,
      editEmail,
      editIdFamiliar,
      editImagen,
      editFechaNacimiento,
      editEstatura,
      editGenero,
      editBarrio,
      editPeso,
      editCategoria,
      editTorneos,
      editBrazoDominante,
    } = req.body;
    await Empresa.findOneAndUpdate({ _id: req.params.id  }, {
      $set: {
        solNombre,
        solDocumento,
        solCodigo,
        solDireccion,
        solTelefono,
        solTelefono2,
        solEmail,
        solIdFamiliar,
        solImagen,
        solFechaNacimiento,
        solEstatura,
        solGenero,
        solBarrio,
        solPeso,
        solCategoria,
        solTorneos,
        solBrazoDominante,
        editNombre,
        editDocumento,
        editCodigo,
        editDireccion,
        editTelefono,
        editTelefono2,
        editEmail,
        editIdFamiliar,
        editImagen,
        editFechaNacimiento,
        editEstatura,
        editGenero,
        editBarrio,
        editPeso,
        editCategoria,
        editTorneos,
        editBrazoDominante,
      }
    });
    res.json({ message: "el formulario de empresa actualizado" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

empresasCtrl.apertura = async (req, res) => {
  try {
    const empresaFound = await Empresa.findOne({ _id: req.params.id });
    if (!empresaFound) return res.status(400).json({ message: "No se encontró la empresa especificada" });
    console.log(req.params.id, req.body);
    const {
      apertura,
      aperturaAm,
      cierreAm,
      aperturaPm,
      cierrePm,
    } = req.body;
    await Empresa.findOneAndUpdate({ _id: req.params.id  }, {
      $set: {
        apertura,
        aperturaAm,
        cierreAm,
        aperturaPm,
        cierrePm,
      }
    });
    res.json({ message: "los datos de apertura y cierre de empresa actualizados" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

empresasCtrl.deleteEmpresa = async (req, res) => {
  try {
    const empresaFound = await Empresa.findOne({ _id: req.params.id });
    if (!empresaFound) return res.status(400).json({ message: "No se encontró la empresa especificada" });
    const empresa = await Empresa.findByIdAndDelete(req.params.id);
    res.json({ title: "Empresa eliminada" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

empresasCtrl.uploadImgEmpresa = async (req, res) => {
  try {
    //res.json({ title: "Imagen subida" });
    for (let i = 0; i < req.files.length; i++) {
      const newImgEmp = new ImgEmp(req.files[i]);
      if (req.files[i]) {
        const { filename } = req.files[i]
        tipoImg = req.files[i].mimetype.slice(6)
        //newImgEmp.setImagen(filename + '.' + tipoImg)
        newImgEmp.setImagen(filename, req.body.tipo, req.body.descripcion, req.body.titulo)
      }
      const verImgEmp = await ImgEmp.findOne({ imagen: newImgEmp.imagen });
      if(verImgEmp){
        console.log("la imagen ya esta en bd")
      } else {
        console.log("la imagen no esta en bd")
        console.log(newImgEmp);
        const savedImgEmp = await newImgEmp.save();
        console.log(savedImgEmp)
      }
    
      
    }
    res.status(200).json({ message: "imagenes guardadas con exito" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

empresasCtrl.showImgEmpresa = async (req, res) => {
  try {
    const imgEmpresas = await ImgEmp.find(); //
  res.json(imgEmpresas);
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

empresasCtrl.deleteImgEmpresa = async (req, res) => {
  try {
    const imgFound = await ImgEmp.findOne({ _id: req.params.id });
      if (!imgFound) return res.status(400).json({ message: "No se encontró la imagen especificada" });
      if (imgFound.imagen == null) {
        console.log("no tiene imagen en bd")
        res.status(400).json({ message: "No tiene imagen para eliminar" });
      } else {
        //se elimina la imagen del directorio en el servidor
        imagenOld = imgFound.imagen
        console.log(imagenOld)
          //se acota el link, obteniendo solo el archivo que es el old
        old = imagenOld.slice(35);
        console.log(old)
          //se agrega la ruta y se rectifica que exista el archivo y luego se elimina
        if (fs.existsSync('./src/public/ImagesEmpresa/' + old)) {
          fs.unlinkSync('./src/public/ImagesEmpresa/' + old)
          console.log("imagen eliminada")
        }
          res.status(200).json({ message: "imagen eliminada" });
          //}
      }
      const empresa = await ImgEmp.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

empresasCtrl.editVerImgEmpresa = async (req, res) => {
  try {
    const empresaImgFound = await ImgEmp.findOne({ _id: req.params.id });
    if (!empresaImgFound) return res.status(400).json({ message: "No se encontró la imagen de empresa especificada" });
    const { ver } = req.body;
    await ImgEmp.findOneAndUpdate({ _id: req.params.id }, { $set: { ver }});
    res.json({ message: "ver imagen actualizado" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

empresasCtrl.editPresentarImgEmpresa = async (req, res) => {
  try {
    const empresaImgFound = await ImgEmp.findOne({ _id: req.params.id });
    if (!empresaImgFound) return res.status(400).json({ message: "No se encontró la imagen de empresa especificada" });
    const { presentar } = req.body;
    await ImgEmp.findOneAndUpdate({ _id: req.params.id }, { $set: { presentar } });
    res.json({ message: "presentar imagen actualizado" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

module.exports = empresasCtrl;
