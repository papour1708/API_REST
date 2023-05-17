// Déclaration des modules ou constances nécessaires
const express = require('express')
const app = express()
const port = 3000
require('dotenv').config({ path: 'config/.env' })
const mongoose = require('mongoose')
const usersRoutes = require('./routes/usersController')
const bodyParser = require('body-parser')
//Conexion base de données
const options = {
    autoIndex: false, 
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000, 
    family: 4 
  }
  const uri = process.env.uriAtlas
  mongoose.connect(uri, options).then(
    () => { console.log("Conexion à la base de données réussie") },
    err => { console.log("Erreur de connexion à la BDD") }
  )

app.use(bodyParser.json());
app.use('/users', usersRoutes)
// Ecouté le seveur sur le port indiqué ci dessus
app.listen(port, ()=> console.log('Server lancé sur le port '+port))