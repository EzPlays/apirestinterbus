const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all usu_bus
router.get('/usu_bus', (req, res) => {
    mysqlConnection.query('SELECT * FROM usu_bus', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// GET An usu_bus
router.get('/usu_bus/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM usu_bus WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

// DELETE An usu_bus
router.delete('/usu_bus/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM usu_bus WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'usu_bus eliminado' });
        } else {
            console.log(err);
        }
    });
});

// INSERT An usu_bus
router.post('/usu_bus', (req, res) => {
    const { id, usuario_id, bus_id } = req.body;
    console.log(id, usuario_id, bus_id);
    const query = `CALL usu_busAddOrEdit(?, ?, ?)`;
    mysqlConnection.query(query, [id, usuario_id, bus_id], (err, rows, fields) => {
        try {
            if (!err) {
                res.json({ status: 'usu_bus guardado' });
            } else {
                return res.status(404).json({message: 'El usuario o el bus no se encuentra en la db'})
            }
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
        
    });

});

// Updated usu_bus
router.put('/usu_bus/:id', (req, res) => {
    const { usuario_id, bus_id } = req.body;
    const { id } = req.params;
    const query = `CALL usu_busAddOrEdit(?, ?, ?)`;
    mysqlConnection.query(query, [id, usuario_id, bus_id], (err, rows, fields) => {
        try {
            if (!err) {
                res.json({ status: 'usu_bus actualizado' });
            } else {
                return res.status(404).json({message: 'El usuario o el bus no se encuentra en la db'})
            }
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    });
});

module.exports = router;
