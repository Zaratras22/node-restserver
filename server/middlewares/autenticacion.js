const jwt = require("jsonwebtoken");

//============
//verificar token
//============

let verificarToken = (req, res, next) => {
  let token = req.get("token");

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err:{
          message: 'Token no valido'
        }
      });
    }

    req.usuario = decoded.usuario;
    next();
  });
};

//============
//verificar ADMIN_ROLE
//============
let verificarAdmin_role = (req, res, next)=>{

  let usuario = req.usuario;

  if(usuario.role === 'ADMIN_ROLE'){
    next();

  }else{
    return res.json({
      ok: false,
      err: {
        message: 'El usuario no es administrador'
      }
    })
  }

  
}

module.exports = {
  verificarToken,
  verificarAdmin_role
};