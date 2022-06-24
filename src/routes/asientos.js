const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all asientos
router.get('/asientos', (req, res) => {
  mysqlConnection.query('SELECT * FROM asiento', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An asientos
router.get('/asientos/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM asiento WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An asientos
router.delete('/asientos/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM asiento WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'asiento eliminado'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An asientos
router.post('/asientos', (req, res) => {
  const {id, estado, num_asiento, bus_id, reserva_id} = req.body;
  console.log(id, estado, num_asiento, bus_id, reserva_id);
  const query = `CALL asientoAddOrEdit(?, ?, ?, ?, ?)`;
  mysqlConnection.query(query, [id, estado, num_asiento, bus_id, reserva_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'asiento guardado'});
    } else {
      console.log(err);
    }
  });

});

// Updated asiento
router.put('/asientos/:id', (req, res) => {
  const { estado, num_asiento, bus_id, reserva_id } = req.body;
  const { id } = req.params;
  const query = `CALL asientoAddOrEdit(?, ?, ?, ?, ?)`;
  mysqlConnection.query(query, [id, estado , num_asiento, bus_id, reserva_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'asiento actualizado'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
