const mongoose = require("mongoose")

// Création d'un model de Schéma mongose
const UsersModel = mongoose.model(
    "api",
    {
      author: {
        type: String,
        required: true
      },
      role: {
        type: String,
        required: true
      }
    },
    "users"
  )
  module.exports = { UsersModel }

  