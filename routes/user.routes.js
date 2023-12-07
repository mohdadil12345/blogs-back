
const express = require("express")
const { UserModel } = require("../models/user.model")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


userRouter.post("/register", async (req, res) => {

    try {

        const { username, email, password, avatar } = req.body

        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(200).send({ "error": err.message })
            } else {
                const user = new UserModel({ username,avatar, email, password: hash })
                await user.save()
                res.status(200).send({ "msg": "a new user has been registered"})
            
            }
        })




    } catch (error) {
        res.status(400).send({ "error": err.message })
    }

})


//  loginnn

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {

        const user = await  UserModel.findOne({email})

        bcrypt.compare(password, user.password, async (err, result) => {
            if (result) {

                const token = jwt.sign({username : user.username, userID : user._id}, "masai")
                res.status(200).send({ "msg": "login successfull", token })
            } else {
               
                res.status(200).send({ "msg": "wrong credential"})
            
            }
        })




    } catch (error) {
        res.status(400).send({ "error": error.message })
    }

})





module.exports = {
    userRouter
}