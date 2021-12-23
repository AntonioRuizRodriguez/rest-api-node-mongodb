const Clientes = require("../models/Clientes");

exports.nuevoCliente = async (req, res, next) => {
  const cliente = new Clientes(req.body);
  console.log(cliente);

  try {
    await cliente.save();
    res.json({ mensaje: "Se ha guardado un nuevo cliente" });
  } catch (e) {
    console.log(e);
    next();
  }
};

exports.mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({});
    res.json(clientes);
  } catch (e) {
    console.log(e);
    next();
  }
};

//Traer un cliente por Id
exports.mostrarClientePorId = async (req, res, next) => {
  const cliente = await Clientes.findById(req.params.id);

  if (!cliente) {
    res.json({ mensaje: "El Cliente no existe" });
    next();
  }

  res.json(cliente);
};

//Actualia un cliente por Id
exports.actualizaCliente = async (req, res, next) => {
  console.log(req.params);
  try {
    const cliente = await Clientes.findOneAndUpdate(
      { _id : req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.json(cliente);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.eliminaCliente=async(req,res,next)=>{
  try{
    await Clientes.findOneAndDelete({_id : req.params.id});
    res.json({mensaje:'El Cliente se ha Eliminado'});
  }catch (error){
    console.log(error);
    next;
  }
}
