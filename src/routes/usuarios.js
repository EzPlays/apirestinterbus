const { query } = require('express');
const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all usuarios
/**
 * @swagger
 * components:
 *  parameters:
 *    usuid:
 *        in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: el id del usuario
 *  schemas:
 *    Usuario:
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
 *        email:
 *          type: string
 *          description: correo del usuario
 *        clave:
 *          type: string
 *          description: contraseña del usuario
 *        rol:
 *          type: string
 *          description: rol del usuario
 *      required:
 *         - nombre
 *         - apellido
 *         - tipo_doc
 *         - num_doc
 *         - email
 *         - clave
 *         - rol
 *      example:
 *          id: 1
 *          nombre: juan
 *          apellido: diaz
 *          tipo_doc: cc
 *          num_doc: 10622563409
 *          email: example@gmail.com
 *          clave: contraseña123
 *          rol: despachador   
 */    

/**
 * @swagger
 * components:
 *  schemas:
 *    UsuarioInsert:
 *      example:
 *          nombre: prueba2
 *          apellido: pba
 *          tipo_doc: cc
 *          num_doc: 4353663554
 *          email: example2@gmail.com
 *          clave: pass1234
 *          rol: conductor 
 *    UsuarioEdit:
 *      example:
 *          nombre: edit
 *          apellido: editado
 *          tipo_doc: cc
 *          num_doc: 6474664543
 *          email: exampleEdit@gmail.com
 *          clave: editpass
 *          rol: admin 
 */ 

/**
 * @swagger
 * tags: 
 *  name: Usuarios
 *  description: Rutas de Usuario
 */

/**
 * @swagger
 * /usuarios:
 *  get:
 *    summary: obtiene todos los usuarios
 *    tags: [Usuarios]
 *    responses:
 *      200: 
 *        description: lista de usuarios
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Usuario' 
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
  if(email && clave) {
    mysqlConnection.query('SELECT rol, email, clave FROM usuario WHERE email = ? and clave = ?', [email, clave], (err, result) => {
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
/**
 * @swagger
 * /usuarios/desp:
 *  get:
 *    summary: obtiene todos los despachadores
 *    tags: [Usuarios]
 *    responses:
 *      200: 
 *        description: lista de usuarios
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Usuario'            
 */
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
/**
 * @swagger
 * paths:
 *  /usuarios/{id}:
 *    get:
 *      summary: obtener usuario por id
 *      tags: [Usuarios]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: el id del usuario
 *      responses:
 *        200:
 *          description: usuario encontrado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Usuario'
 *        500:
 *          description: error
 */
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
/**
 * @swagger
 * /usuarios/{id}:
 *  delete: 
 *    summary: eliminar usuario
 *    tags: [Usuarios]
 *    parameters: 
 *      - $ref: '#/components/parameters/usuid'
 *    responses:
 *      200:
 *        description: usuario eliminado
 */
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
/**
 * @swagger
 * /usuarios:
 *  post:
 *    summary: crear un nuevo usuario
 *    tags: [Usuarios]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UsuarioInsert'
 *    responses:
 *      200:
 *        description: usuario guardado
 */
router.post('/usuarios', (req, res) => {
  const {nombre, apellido, tipo_doc, num_doc, email, clave, rol } = req.body;
  console.log(nombre, apellido, tipo_doc, num_doc, email, clave, rol);
  const query = "INSERT INTO usuario (nombre, apellido, tipo_doc, num_doc, email, clave, rol) VALUES (?, ?, ?, ?, ?, ?, ?)";
  mysqlConnection.query(query, [nombre, apellido, tipo_doc, num_doc, email, clave, rol], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'usuario guardado' });
    } else {
      console.log(err);
    }
  });

});

// Updated usuario
/**
 * @swagger
 * /usuarios/{id}:
 *  put:
 *    summary: actualizar un usuario por id
 *    tags: [Usuarios]
 *    parameters: 
 *      - $ref: '#/components/parameters/usuid'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UsuarioEdit'
 *    responses:
 *      200:
 *        description: usuario actualizado
 */
router.put('/usuarios/:id', (req, res) => {
  const { nombre, apellido, tipo_doc, num_doc, email, clave, rol } = req.body;
  const { id } = req.params;
  const query = "UPDATE usuario SET nombre = ?, apellido = ?, tipo_doc = ?, num_doc = ?, email = ?, clave = ?, rol = ?  WHERE id = ?";
  mysqlConnection.query(query, [nombre, apellido, tipo_doc, num_doc, email, clave, rol, id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'usuario actualizado' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
