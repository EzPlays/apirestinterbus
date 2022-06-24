const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all asientos
router.get('/usuarios', (req, res) => {
  mysqlConnection.query('SELECT * FROM usuario', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An asientos
router.get('/usuarios/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM usuario WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An asientos
router.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM usuario WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'usuario eliminado'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An asientos
router.post('/usuarios', (req, res) => {
  const {id, nombre, apellido, tipo_doc, num_doc, email, password, rol} = req.body;
  console.log(id, nombre, apellido, tipo_doc, num_doc, email, password, rol);
  const query = `CALL usuarioAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?)`;
  mysqlConnection.query(query, [id, nombre, apellido, tipo_doc, num_doc, email, password, rol], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'usuario guardado'});
    } else {
      console.log(err);
    }
  });

});

// Updated employee
router.put('/usuario/:id', (req, res) => {
  const { nombre, apellido, tipo_doc, num_doc, email, password, rol } = req.body;
  const { id } = req.params;
  const query = `CALL usuarioAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?)`;
  mysqlConnection.query(query, [id, nombre, apellido, tipo_doc, num_doc, email, password, rol], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'usuario actualizado'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
