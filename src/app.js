//import {createRoles} from './libs/initialSetup'
const express = require("express");
const bodyParser = require('body-parser');
const morgan = require("morgan");
const cors = require("cors");
const { createRoles, EmpresaDefault, usuariosPorDefecto } = require("./libs/initialSetup");
const { activarIntervalos } = require("./libs/politicas");

const app = express();

//settigs
app.set("port", process.env.PORT || 4000);
app.set("host", process.env.HOST || '0.0.0.0');

//middlewares
app.use(cors());
app.use(morgan("dev"));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb",  extended: true, parameterLimit: 1000000 }));

//routes
app.use("/api/users", require("./routes/users.js"));
    //rutas de los diferentes roles
app.use("/api/socio", require("./routes/socio.js"));
app.use("/api/administrador", require("./routes/administrador.js"));
app.use("/api/profesor", require("./routes/profesor.js"));
app.use("/api/canchero", require("./routes/canchero.js"));
    //otras rutas
app.use("/api/empresa", require("./routes/empresas.js"));
app.use("/api/citas", require("./routes/citas.js"));
app.use("/api/horario", require("./routes/horario.js"));
app.use("/api/leccion", require("./routes/lecciones.js"));
app.use("/api/turnos", require("./routes/turnos.js"));
app.use("/api/notificacion", require("./routes/notificacion.js"));
app.use("/api/multa", require("./routes/multa"));
app.use("/api/auth", require("./routes/auth")); //auth

app.use('/public', express.static(`${process.cwd()}/src/public/imagesUser`));
app.use('/publicEmpresa', express.static(`${process.cwd()}/src/public/imagesEmpresa`));
// console.log(process.cwd())


(async()=>{
    await createRoles();
    await EmpresaDefault();
    await usuariosPorDefecto();
    await activarIntervalos();   
})();


module.exports = app;
