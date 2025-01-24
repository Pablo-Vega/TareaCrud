const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function Delete(data) {
    const query = `DELETE FROM coleccion WHERE id = ${data.id}`;
    
    const result = await db.query(query);
}

module.exports = {
    Delete
}