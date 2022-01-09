const Productos = require("../models/Productos");
const multer = require("multer");
const shortid = require("shortid");

const configuracionMulter = {
  storage: (fileSorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato No Valido"));
    }
  },
};

//creamos una instancia de multer con la configuracion
const upload = multer(configuracionMulter).single("imagen");

exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error });
    }
    return next();
  });
};

exports.nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body);

  try {
    if (req.file.filename) {
      producto.imagen = req.file.filename;
    }
    await producto.save();
    res.json({ mensaje: "Se añadió un nuevo producto" });
  } catch (e) {
    console.log(e);
    next();
  }
};

exports.mostrarProductos = async (req, res, next) => {
  try {
    const productos = await Productos.find({});
    res.json(productos);
  } catch (error) {
    console.log(error);
  }
};

exports.mostrarProducto = async (req, res, next) => {
  try {
    const producto = await Productos.findById(req.params.id);
    res.json(producto);
  } catch (error) {
    res.json({
      mensaje: "Ese producto no existe",
    });
    return next();
  }
};

exports.actualizarProducto = async (req, res, next) => {
  try {
    //Nos trameos el producto original
    const productoAnterior = await Productos.findById(req.params.id);

    //Cosntruimos el nuevo producto
    let nuevoProducto = req.body;

    //verificamos si trae imagen
    if (req.file) {
      nuevoProducto.imagen = req.file.filename;
    } else {
      nuevoProducto.imagen = productoAnterior.imagen;
    }

    let producto = await Productos.findOneAndUpdate(
      { _id: req.params.id },
      nuevoProducto,
      { new: true }
    );
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.eliminarProducto = async (req, res, next) => {
  try {
    await Productos.findByIdAndDelete({ _id: req.params.id });
    res.json({
      mensaje: "El Producto se ha eliminado",
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
