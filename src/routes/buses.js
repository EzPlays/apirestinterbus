const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all buses
router.get('/buses', (req, res) => {
  mysqlConnection.query('SELECT * FROM bus', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An buses
router.get('/buses/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM bus WHERE id = ?', [id], (err, rows, fields) => {
    if (rows.length == 0) {
      res.status(404).json('el bus no existe');
    } else {
      res.status(200).json(rows[0]);
    }
  });
});

// DELETE An buses
router.delete('/buses/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM bus WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'bus eliminado' });
    } else {
      console.log(err);
    }
  });
});

// INSERT An buses
router.post('/buses', (req, res) => {
  const { num_bus, placa, tipo_bus } = req.body;
  console.log(num_bus, placa, tipo_bus);
  const query = "INSERT INTO bus (num_bus, placa, tipo_bus) VALUES (?, ?, ?)";
  mysqlConnection.query(query, [num_bus, placa, tipo_bus], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'bus guardado' });
    } else {
      console.log(err);
    }
  });

});

// Updated buses
router.put('/buses/:id', (req, res) => {
  const { num_bus, placa, tipo_bus } = req.body;
  const { id } = req.params;
  const query = "UPDATE bus SET num_bus = ?, placa = ?, tipo_bus = ? WHERE id = ?";
  mysqlConnection.query(query, [num_bus, placa, tipo_bus, id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'bus actualizado' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
