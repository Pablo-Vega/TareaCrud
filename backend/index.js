//importo el express y el cors
const express = require('express')
const cors = require('cors')
//importo el fichero login.js que está en la carpeta services
const login = require('./services/login')
const Insert = require('./services/Insert')
const Deleteitem = require('./services/delete')
const GetItem = require('./services/getitem')

//Definimos el puerto por que va a escuchar nuestra API las peticiones
const port = 3030

const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())



//Ejemplo para ver cómo funciona un endpoint:
//este endpoint / y devuelve un mensaje
app.get('/', function (req, res) {
    res.json({ message: 'Hola usuario!' })
})

//Creación del endpoint: /login
//llama al fichero login.js usando el método getUserData pasándole
//el login (user) y la contraseña (password)
app.get('/login', async function (req, res, next) {
    console.log(req.query)
    console.log(req.query.user)
    console.log(req.query.password)
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
})

//Iniciamos la API
app.listen(port)
console.log('API escuchando en el puerto ' + port)

app.get('/addItem', async function (req, next) {
    console.log(req.query);
    try {
        Insert.insert(req.query);
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
});

app.get('/addUsuario', async function (req, next) {
    console.log(req.query);
    try {
        Insert.insertUser(req.query);
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
});

app.get('/deleteItem', async function (req, next) {
    console.log(req.query);
    try {
        Deleteitem.Delete(req.query);
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
});

/*app.get('/GetItem', async function(req, res, next) {
    console.log(req.query);
    try {
        //const result = await GetItem.getitem();
        res.json(await GetItem.getitem());
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
});*/

app.get('/GetItems', async (req, res) => {
    try {
        await GetItem.getitem(req, res); // Llama la función getData del archivo items.js
    } catch (err) {
        console.error(`Error while getting items: ${err.message}`);
        res.status(500).json({ message: 'Error al obtener los items' });
    }
});

app.get('/GetUsers', async (req, res) => {
    try {
        await GetItem.getusers(req, res); // Llama la función getData del archivo items.js
    } catch (err) {
        console.error(`Error while getting items: ${err.message}`);
        res.status(500).json({ message: 'Error al obtener los items' });
    }
});