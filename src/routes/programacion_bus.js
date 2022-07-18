const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all programacion_bus
router.get('/programacion_buses', (req, res) => {
  mysqlConnection.query('SELECT * FROM programacion_bus', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An programacion_bus
router.get('/programacion_buses/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM programacion_bus WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An programacion_bus
router.delete('/programacion_buses/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM programacion_bus WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Programacion de bus eliminada' });
    } else {
      console.log(err);
    }
  });
});

// INSERT An programacion_bus
router.post('/programacion_buses', (req, res) => {
  const { id, programacion_id, bus_id } = req.body;
  console.log(id, fecha, hora, usuario_id, ruta_id);
  const query = `CALL programacion_busAddOrEdit(?, ?, ?)`;
  mysqlConnection.query(query, [id, programacion_id, bus_id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Programacion de bus guardada' });
    } else {
      console.log(err);
    }
  });

});

// Updated programacion_bus
router.put('/programacion_buses/:id', (req, res) => {
  const { programacion_id, bus_id } = req.body;
  const { id } = req.params;
  const query = `CALL programacion_busAddOrEdit(?, ?)`;
  mysqlConnection.query(query, [id, programacion_id, bus_id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Programacion bus actualizada' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;