const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesController");

module.exports = function () {
  router.post("/clientes", clientesController.nuevoCliente);

  router.get("/clientes", clientesController.mostrarClientes);

  //Traer un cliente por Id
  router.get("/clientes/:id", clientesController.mostrarClientePorId);

  //Actualizar Cliente por id
  router.put("/clientes/:id", clientesController.actualizaCliente);

  //Elimina Cliente
  router.delete("/clientes/:id", clientesController.eliminaCliente);

  return router;
};
