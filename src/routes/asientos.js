const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all asientos
router.get('/asientos', (req, res) => {
  mysqlConnection.query('SELECT * FROM asiento', (err, rows, fields) => {
    if (!err) {
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
    if (rows.length == 0) {
      res.status(404).json('el asiento no existe');
    } else {
      res.status(200).json(rows[0]);
    }
  });
});

// DELETE An asientos
router.delete('/asientos/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM asiento WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'asiento eliminado' });
    } else {
      console.log(err);
    }
  });
});

// INSERT An asientos
router.post('/asientos', (req, res) => {
  const { estado, num_asiento, bus_id, reserva_id } = req.body;
  console.log(estado, num_asiento, bus_id, reserva_id);
  const query = "INSERT INTO asiento (estado, num_asiento, bus_id, reserva_id) VALUES (?, ?, ?, ?)";
  mysqlConnection.query(query, [estado, num_asiento, bus_id, reserva_id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'asiento guardado' });
    } else {
      console.log(err);
    }
  });

});

// Updated asiento
router.put('/asientos/:id', (req, res) => {
  const { estado, num_asiento, bus_id, reserva_id } = req.body;
  const { id } = req.params;
  const query = "UPDATE asiento SET estado = ?, num_asiento = ?, bus_id = ?, reserva_id = ? WHERE id = ?";
  mysqlConnection.query(query, [estado, num_asiento, bus_id, reserva_id, id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'asiento actualizado' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
