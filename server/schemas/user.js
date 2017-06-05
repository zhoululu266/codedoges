const Schema = require('mongoose').Schema
const UserSchema = new Schema({
  username: {
    unique: true,
    type: String
  },
  password: String
})

module.exports = UserSchema
