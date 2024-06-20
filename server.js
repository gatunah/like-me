const express = require("express");
const axios = require("axios");
const { getData, insertar, editar, eliminar } = require("./database/connection");
const app = express();
const port = 3002;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


app.use(express.json());//PARA ACCEDER A req.body

//ESTATICOS
app.use(express.static("public"));

//VISTA
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//COMPLETAR DATOS
app.get("/posts", async (req, res) => {
    try {
      const result = await getData();
      //console.log(result);
      res.json(result);//DEVUELVE JSON
    } catch (error) {
      console.error("Error al obtener getData", error);
      res
        .status(500)
        .json({ success: false, message: "Error interno al obtener getData" });
    }
  });
//INSERTAR
app.post("/post", async (req, res) => {
    try {
      const datos = Object.values(req.body);
      const respuesta = await insertar(datos);
      res.json(respuesta);
      //console.log(respuesta);
      //console.log(datos);
    } catch (error){
      console.error("Error al insertar el posts:", error);
      res
        .status(500)
        .json({ success: false, message: "Error interno al insertar post" });
    }
  });
  //EDITAR
  app.put("/post", async (req, res) => {
    try {
      const { id } = req.query;
      const resultado = await editar(id);
      //console.log(resultado);
      res.status(200).json({ success: true, message: "like agregado" });
    } catch (error){
      console.error("Error al agregar like:", error);
      res
        .status(500)
        .json({ success: false, message: "Error interno agregar like" });
    }
  });