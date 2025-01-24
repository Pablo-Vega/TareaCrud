const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function getitem(req, res) {
    try {
        const rows = await db.query('SELECT * FROM coleccion');

        const data = helper.emptyOrRows(rows);

        return res.json({ data });
    } catch (err) {
        console.error('Error al obtener los datos: ', err.message);
        return res.status(500).json({ message: 'Error al obtener los datos' });
    }
}

async function getusers(req, res) {
    try {
        const rows = await db.query('SELECT * FROM usuarios');

        const data = helper.emptyOrRows(rows);

        return res.json({ data });
    } catch (err) {
        console.error('Error al obtener los datos: ', err.message);
        return res.status(500).json({ message: 'Error al obtener los datos' });
    }
}

module.exports = {
    getitem,
    getusers
}