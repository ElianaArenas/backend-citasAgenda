const imgEmpresaCtrl = {};

const ImagenEmpresa =  require("../models/ImgEmpresa");

imgEmpresaCtrl.edit = async (req, res)=> {
  try {
    const { titulo, descripcion } = req.body;
    let body = {};

    if (descripcion) body.descripcion = descripcion;
    if (titulo) body = { ...body, titulo };

    await ImagenEmpresa.findOneAndUpdate({ _id: req.params.id }, body);

    res.json({ title: "Imagen actualizada" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "error en la solicitud"})
  }
}

module.exports = imgEmpresaCtrl;