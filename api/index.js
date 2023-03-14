// Estos los modulos que instalamos que se llaman en este archivo para poderlo usar
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Estamos declarando la variable que va a contener la aplicación
const app = express();
var jsonParser = bodyParser.json();
const port = 3000;

// Aquí nos conectamos con la base de datos que ya tenemos en MySQL
const connection = mysql.createConnection({
  host: 'localhost', // localhost quiere decir que estamos usando la base de datos que esta en nuestra PC
  user: 'root', // El usuario que creamos en MySQL
  password: '123456', // La contraseña que creamos en MySQL para el usuario (puede ser vació si no la tenemos)
  database: 'tienda_online', // El nombre de la base de datos que creamos en MySQL
});

connection.connect(function (error) {
  if (error) {
    console.error('Error al conectarse a la base de datos');
    console.error(error.stack);
    return null;
  }

  console.log('Se conecto a la base de datos: #' + connection.threadId);
});

// Esto es para la seguridad de la aplicación
app.use(cors());

// Esta función es para obtener todos los datos de la base de datos y mandarlo al HTML
app.get('/', (_req, res) => {
  connection.query('select * from productos', (error, results) => {
    if (error) {
      console.error('Error al obtener los productos: ' + error.stack);
      return null;
    }

    res.send(results);
  });
});

// Esta función es para recibir un producto y agregarlo a la base de datos
app.post('/', jsonParser, (req, res) => {
  const data = req.body;

  connection.query('insert into productos set ?', data, (error, _results) => {
    if (error) {
      console.error('Error al agregar el producto!');
      console.error(error.stack);
      return null;
    }

    connection.query('select * from productos', (error, results) => {
      if (error) {
        console.error('Error al obtener los productos');
        console.error(error.stack);
        return null;
      }

      res.send(results);
    });
  });
});

// Esta función es la que hace que se ejecute la aplicación en http://localhost:3000/
app.listen(port, () => {
  console.log(`El servidor esta corriendo en la url: http://localhost:${port}`);
});
