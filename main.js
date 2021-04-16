"use strict";

// Requerir el interfaz http
const http = require('http'); // Definir el puerto a utilizar
const queryString = require('query-string');

const port = 3000;
// Crear el servidor y definir la respuesta que se le da a las peticiones
const server = http.createServer((req, res) => { // Código de estado HTTP que se devuelve res.statusCode = 200;
  // Extrear el contenido de la petición
const { headers, method, url } = req; 
console.log('headers: ', headers); 
console.log('method: ', method);
console.log('url: ', url);
let body = []; 
req.on('error', (err) => {
    console.error(err);
}).on('data', (chunk) => {
// El cuerpo de la petición puede venir en partes, aquí se concatenan
    body.push(chunk);
}).on('end', () => {
// El cuerpo de la petición está completo
body = Buffer.concat(body).toString(); console.log('body: ', body);
// Código de estado HTTP que se devuelve
res.statusCode = 200;
    // Encabezados de la respuesta, texto plano 
    res.setHeader('Content-Type', 'text/plain');
    // Contenido de la respuesta
    res.end('Hola Mundo'); });});
    // Ejecutar el servicio para que permanezca a la espera de peticiones
server.listen(port, () => {
    console.log('Servidor ejecutándose...');
    console.log('Abrir en un navegador http://localhost:3000');
    });


// Importar el cliente de MongoDB
const MongoClient = require('mongodb').MongoClient;
// Especificar la URL de conexión por defecto al servidor local
const url = 'mongodb://localhost:27017';
// Nombre de la base de datos a la que conectarse
const dbName = 'agenda';
// Crear una instancia del cliente de MongoDB
const client = new MongoClient(url, {useUnifiedTopology: true});
// Conectar el cliente al servidor
client.connect().then(async () => {
    console.log("Conectado con éxito a la Base de datos");
    const db = client.db(dbName);

    // Obtener la referencia a la colección
const collection = db.collection('contact');

// Llamar a la función para insertar
const insertResult = await collection.insertMany([{ // insertamos un usuario
    name: 'Javier', phone:'981451296'}, 
    {name: 'Pedro', phone:'900258741'}, 
    {name: 'Raquel', phone:'902558741'}]); 
console.log("Resultado de la inserción: ", insertResult.result);

// Llamar a la función para recuperar
const findResult = await collection.find({}).toArray(); console.log("Documentos recuperados: ", findResult);
client.close();
}).catch((error) => {
console.log("Se produjo algún error en las operaciones con la base de datos: " + error);
  client.close();
});


    

    
