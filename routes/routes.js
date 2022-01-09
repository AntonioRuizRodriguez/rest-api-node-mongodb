const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesController");
const productosController = require("../controllers/productosControllers");

module.exports = function () {
  router.post("/clientes", clientesController.nuevoCliente);

  router.get("/clientes", clientesController.mostrarClientes);

  //Traer un cliente por Id
  router.get("/clientes/:id", clientesController.mostrarClientePorId);

  //Actualizar Cliente por id
  router.put("/clientes/:id", clientesController.actualizaCliente);

  //Elimina Cliente
  router.delete("/clientes/:id", clientesController.eliminaCliente);

  //Introducir nuevos productos
  router.post(
    "/productos",
    productosController.subirArchivo,
    productosController.nuevoProducto
  );

  //Mostrar todos los Productos
  router.get("/productos", productosController.mostrarProductos);

  //Mostrar Producto por Id
  router.get("/productos/:id", productosController.mostrarProducto);

  //Actualiar Producto
  router.put(
    "/productos/:id",
    productosController.subirArchivo,
    productosController.actualizarProducto
  );

  router.delete('/productos/:id',productosController.eliminarProducto);

  return router;
};
