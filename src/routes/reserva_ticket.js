const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all reserva_ticket
router.get('/reserva_tickets', (req, res) => {
  mysqlConnection.query('SELECT * FROM reserva_ticket', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An reserva_ticket
router.get('/reserva_tickets/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM reserva_ticket WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An reserva_ticket
router.delete('/reserva_tickets/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM reserva_ticket WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Reserva eliminada' });
    } else {
      console.log(err);
    }
  });
});

// INSERT An reserva_ticket
router.post('/reserva_tickets', (req, res) => {
  const { valor_uni, total, programacion_id, usuario_id } = req.body;
  console.log(id, valor_uni, total, programacion_id, usuario_id);
  const query = "INSERT INTO reserva_ticket (valor_uni, total, programacion_id, usuario_id) VALUES (?, ?, ?, ?)";
  mysqlConnection.query(query, [valor_uni, total, programacion_id, usuario_id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Reserva guardada' });
    } else {
      console.log(err);
    }
  });

});

// Updated reserva_ticket
router.put('/reserva_tickets/:id', (req, res) => {
  const { valor_uni, total, programacion_id, usuario_id } = req.body;
  const { id } = req.params;
  const query = "UPDATE reserva_ticket SET valor_uni = ?, total = ?, programacion_id = ?, usuario_id = ? WHERE id = ?";
  mysqlConnection.query(query, [valor_uni, total, programacion_id, usuario_id, id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Reserva actualizada' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;