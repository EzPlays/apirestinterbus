const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all rutas
router.get('/rutas', (req, res) => {
  mysqlConnection.query('SELECT * FROM ruta', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An ruta
router.get('/rutas/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM ruta WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An ruta
router.delete('/rutas/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM ruta WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'ruta eliminada' });
    } else {
      console.log(err);
    }
  });
});

// INSERT An ruta
router.post('/rutas', (req, res) => {
  const {lugares } = req.body;
  console.log(lugares);
  const query = "INSERT INTO ruta (lugares) VALUES (?)";
  mysqlConnection.query(query, [lugares], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'ruta guardada' });
    } else {
      console.log(err);
    }
  });
});

// Updated ruta
router.put('/rutas/:id', (req, res) => {
  const { lugares } = req.body;
  const { id } = req.params;
  const query = "UPDATE asiento SET lugares = ? WHERE id = ?";
  mysqlConnection.query(query, [lugares, id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Ruta actualizada' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;