const Pedidos = require("../models/Pedidos");

exports.nuevoPedido = async (req, res, next) => {
  const pedido = new Pedidos(req.body);
  try {
    await pedido.save();
    res.json({ mensaje: "Se agregóp un nuevo pedido" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.mostrarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedidos.find({}).populate("clientes").populate({
      path: "productos.pedido",
      model: "Productos",
    });
    res.json(pedidos);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.mostrarPodidoPorId = async (req, res, next) => {
  try {
    const pedido = await Pedidos.findById(req.params.id)
      .populate("clientes")
      .populate({
        path: "productos.pedido",
        model: "Productos",
      });
    res.json(pedido);
  } catch (error) {
    res.json({ mensaje: "El pedido no existe" });
    return next();
  }
};

exports.actualizarPedido = async (req, res, next) => {
  try {
    let pedido = await Pedidos.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    )
      .populate("clientes")
      .populate({
        path: "productos.pedido",
        model: "Productos",
      });
    res.json(pedido);
  } catch (error) {
    res.json({ mensaje: "El pedido no existe" });
    return next();
  }
};

exports.eliminarPedido = async (req, res, next) => {
  try {
    await Pedidos.findOneAndDelete({ _id: req.params.id });
    res.json({ mensaje: "El pedido se ha eliminado correctamente" });
  } catch (error) {
    res.json({ mensaje: "El pedido no existe" });
    return next();
  }
};
