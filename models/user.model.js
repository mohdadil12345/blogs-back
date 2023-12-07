
const mongoose = require("mongoose")

const userSchema = ({
    username : String,
    email : String,
    password : String,
    avatar : String
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}