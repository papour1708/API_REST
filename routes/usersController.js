// Déclaration des modules ou constances nécessaires
const express = require('express')
const router = express.Router()
const ObjectID = require('mongoose').Types.ObjectId
const { UsersModel } = require('../models/usersModel')

// Afficher tous les utilisateur avec la méthode Get
router.get('/', (req, res) => {
    UsersModel.find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err)
    })
})

// Ajouter un nouvelle utilisateur en utilisation son id
router.post('/', (req, res) => {
    const newRecord = new UsersModel({
      author: req.body.author,
      role: req.body.role
    })
    // Enregistrer le nouvel utilisateur dans la base de données
    newRecord.save((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error creating new data : ' + err)
    })
})

// Modifier un utilisateur dans la base de données en utilisant son id
router.put("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id)
  
  const updateRecord = {
    author: req.body.author,
    role: req.body.role
  }

  UsersModel.findByIdAndUpdate(
    req.params.id,
    { $set: updateRecord},
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err)
    }
  )
})

//  Supprimer un utilisateur en utilisant son id
router.delete("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id)
  
    UsersModel.findByIdAndRemove(
    req.params.id,
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err)
    })
})

module.exports = router