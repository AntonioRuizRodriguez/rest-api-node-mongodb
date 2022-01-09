const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesController");
const productosController = require("../controllers/productosControllers");
const pedidosController = require("../controllers/pedidosController");

module.exports = function () {
  //=========== CLIENTES ===========//
  router.post("/clientes", clientesController.nuevoCliente);

  router.get("/clientes", clientesController.mostrarClientes);

  //Traer un cliente por Id
  router.get("/clientes/:id", clientesController.mostrarClientePorId);

  //Actualizar Cliente por id
  router.put("/clientes/:id", clientesController.actualizaCliente);

  //Elimina Cliente
  router.delete("/clientes/:id", clientesController.eliminaCliente);

  //=========== PRODUCTOS ===========//
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
  //Eliminar Producto por Id
  router.delete("/productos/:id", productosController.eliminarProducto);

  //=========== PEDIDOS ===========//

  //Hacer pedidos
  router.post("/pedidos", pedidosController.nuevoPedido);

  //Mostrar pedidos
  router.get("/pedidos", pedidosController.mostrarPedidos);

  //Mostrar pedidos por id
  router.get("/pedidos/:id", pedidosController.mostrarPodidoPorId);

  //Actualizar pedidos
  router.put("/pedidos/:id", pedidosController.actualizarPedido);

  //Eliminar pedido
  router.delete("/pedidos/:id", pedidosController.eliminarPedido);
  return router;
};
