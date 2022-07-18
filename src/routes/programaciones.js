const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all programacion
router.get('/programaciones', (req, res) => {
  mysqlConnection.query('SELECT * FROM programacion', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An programacion
router.get('/programaciones/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM programacion WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An programaciones
router.delete('/programaciones/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM programacion WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Programacion eliminada' });
    } else {
      console.log(err);
    }
  });
});

// INSERT An programaciones
router.post('/programaciones', (req, res) => {
  const { id, fecha, hora, usuario_id, ruta_id } = req.body;
  console.log(id, fecha, hora, usuario_id, ruta_id);
  const query = `CALL programacionAddOrEdit(?, ?, ?, ?, ?)`;
  mysqlConnection.query(query, [id, fecha, hora, usuario_id, ruta_id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Programacion guardada' });
    } else {
      console.log(err);
    }
  });

});

// Updated programacion
router.put('/programaciones/:id', (req, res) => {
  const { fecha, hora, usuario_id, ruta_id } = req.body;
  const { id } = req.params;
  const query = `CALL programacionAddOrEdit(?, ?, ?, ?)`;
  mysqlConnection.query(query, [id, fecha, hora, usuario_id, ruta_id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Programacion actualizada' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;