const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
  clientes: {
    type: Schema.ObjectId,
    ref: "Clientes",
  },
  productos: [
    {
      pedido: {
        type: Schema.ObjectId,
        ref: "Productos",
      },
      cantidad: Number,
    },
  ],
  total: {
    type: "Number",
  },
});

module.exports = mongoose.model("Pedidos", pedidosSchema);
