const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientesSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
  },
  apellido: {
    type: String,
    trim: true,
  },
  empresa: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,         //El atributo unique dará error en el CRUD de base de datos si otro usuario intenta tener el mismo email
    lowercase: true,
    trim:true,
  },
  telefono: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Clientes',clientesSchema);
