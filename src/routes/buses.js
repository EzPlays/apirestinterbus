const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all asientos
router.get('/buses', (req, res) => {
  mysqlConnection.query('SELECT * FROM bus', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An asientos
router.get('/buses/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM bus WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An asientos
router.delete('/buses/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM bus WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'bus eliminado'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An asientos
router.post('/buses', (req, res) => {
  const {id, num_bus, placa, tipo_bus} = req.body;
  console.log(id, num_bus, placa, tipo_bus);
  const query = `CALL busAddOrEdit(?, ?, ?, ?)`;
  mysqlConnection.query(query, [id, num_bus, placa, tipo_bus], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'bus guardado'});
    } else {
      console.log(err);
    }
  });

});

// Updated employee
router.put('/buses/:id', (req, res) => {
  const { num_bus, placa, tipo_bus } = req.body;
  const { id } = req.params;
  const query = `CALL busAddOrEdit(?, ?, ?, ?)`;
  mysqlConnection.query(query, [id, num_bus, placa, tipo_bus], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'bus actualizado'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
