const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function insert(data) {
    const query = `INSERT INTO coleccion(nombre, marca, tipo, precio) VALUES (?, ?, ?, ?)`;
    const values = [data.nombre, data.marca, data.tipo, data.precio];
    
    const result = await db.query(query, values);
}

async function insertUser(data) {
    const query = `INSERT INTO usuarios(nombre, login, password, rol) VALUES (?, ?, ?, ?)`;
    const values = [data.nombre, data.login, data.password, data.rol];
    
    const result = await db.query(query, values);
}

module.exports = {
    insert,
    insertUser
}