const { query } = require('express');
const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all usuarios
// tipo_doc, num_doc, email, clave, rol
/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: id del usuario
 *        nombre:
 *          type: string
 *          description: nombre del usuario
 *        apellido:
 *          type: string
 *          description: apellido del usuario
 *        tipo_doc:
 *          type: string
 *          description: tipo de documento del usuario
 *        num_doc:
 *          type: integer
 *          description: numero de documento del usuario
 *      required:
 *         - nombre
 *         - apellido
 *        
 */      
/**
 * @swagger
 * /usuarios:
 *  get:
 *    summary: obtiene todos los usuarios
 *    responses:
 *      200: 
 *        description: lista de usuarios
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              
 */
router.get('/usuarios', (req, res) => {
  mysqlConnection.query('SELECT * FROM usuario', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//login a user web
router.post('/usuarios/login', (req, res) => {
  const { email, clave } = req.body;
  const query = `SELECT * FROM usuario WHERE email = ? and clave = ?`
  if (email && clave) {
    mysqlConnection.query(query, [email, clave], (err, rows, fields) => {
      if (!err) {
        if (rows == 0) {
          res.status(403)
          res.send({ message: 'Invalid email y/o clave' })
        } else {
          res.json(rows);
        }
      } else {
        console.log(err);
      }
    });
  }
});

/*login 2 consumo andriod*/
router.post('/login', (req, res) => {
  const email = req.body.email;
  const clave = req.body.clave;
  arrayroles = ["despachador", "conductor", "admin"]
  for(var i=0; i<arrayroles.length; i++){
    rol = arrayroles[i]
    console.log(rol);
  }
  if(email && clave && rol) {
    mysqlConnection.query('SELECT * FROM usuario WHERE email = ? and clave = ? and rol = ?', [email, clave, rol], (err, result) => {
      if(result.length == 0){
        res.status(403)
        res.send({ message: 'email y/o clave incorrecta' });
      } else {
        // res.send({ message: 'login correct' });
        res.json(result);
      }
    })
  }
})

// Get user rol despachador
router.get('/usuarios/desp', (req, res) => {
  // const {id, email, clave, rol} = req.body;
  rol = "despachador"
  mysqlConnection.query('SELECT * FROM usuario WHERE rol = ?', [rol], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// Get user rol conductor
router.get('/usuarios/conduc', (req, res) => {
  // const {id, email, clave, rol} = req.body;
  rol = "conductor"
  mysqlConnection.query('SELECT * FROM usuario WHERE rol = ?', [rol], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// Get user rol pasajero
router.get('/usuarios/pasa', (req, res) => {
  // const {id, email, clave, rol} = req.body;
  rol = "pasajero"
  mysqlConnection.query('SELECT * FROM usuario WHERE rol = ?', [rol], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// Get user rol jefe de rodamiento
router.get('/usuarios/jefe', (req, res) => {
  // const {id, email, clave, rol} = req.body;
  rol = "jefe de rodamiento"
  mysqlConnection.query('SELECT * FROM usuario WHERE rol = ?', [rol], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// Get user rol admin
router.get('/usuarios/admin', (req, res) => {
  // const {id, email, clave, rol} = req.body;
  rol = "admin"
  mysqlConnection.query('SELECT * FROM usuario WHERE rol = ?', [rol], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An usuario
router.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT email, clave, rol FROM usuario WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An usuario
router.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM usuario WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'usuario eliminado' });
    } else {
      console.log(err);
    }
  });
});

// INSERT An usuario
router.post('/usuarios', (req, res) => {
  const { id, nombre, apellido, tipo_doc, num_doc, email, clave, rol } = req.body;
  console.log(id, nombre, apellido, tipo_doc, num_doc, email, clave, rol);
  const query = `CALL usuarioAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?)`;
  mysqlConnection.query(query, [id, nombre, apellido, tipo_doc, num_doc, email, clave, rol], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'usuario guardado' });
    } else {
      console.log(err);
    }
  });

});

// Updated usuario
router.put('/usuarios/:id', (req, res) => {
  const { nombre, apellido, tipo_doc, num_doc, email, clave, rol } = req.body;
  const { id } = req.params;
  const query = `CALL usuarioAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?)`;
  mysqlConnection.query(query, [id, nombre, apellido, tipo_doc, num_doc, email, clave, rol], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'usuario actualizado' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
