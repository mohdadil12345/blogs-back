
const express = require("express")
const { blogModel } = require("../models/blog.model")
const { auth } = require("../middleware/auth.middleware")
const blogRouter = express.Router()



blogRouter.post("/blogs", auth, async (req, res) => {

    try {

        const blog = new blogModel(req.body)
         await blog.save()
         res.status(200).send({ "msg":  blog})

    } catch (error) {
        res.status(400).send({ "error": err.message })
    }

})

// get
blogRouter.get("/blogs", auth, async (req, res) => {
  


   try {
    const {sort, order} = req.query
    const sortorder = order == "asc" ? 1 : -1

       const blog = await  blogModel.find().sort({[sort] : sortorder})
        
        res.status(200).send({ "msg":  blog})

   } catch (error) {
       res.status(400).send({ "error": error.message })
   }

})





// patch
blogRouter.patch("/blogs/:id",auth, async (req, res) => {
     const {id} = req.params
    try {

        const blog = await  blogModel.findByIdAndUpdate({_id : id}, req.body)
         
         res.status(200).send({ "msg":  blog})

    } catch (error) {
        res.status(400).send({ "error": error.message })
    }

})

// delete
blogRouter.delete("/blogs/:id", auth, async (req, res) => {
     const {id} = req.params
    try {

        const blog = await  blogModel.findByIdAndDelete({_id : id}, req.body)
         
         res.status(200).send({ "msg":  blog})

    } catch (error) {
        res.status(400).send({ "error": error.message })
    }

})






module.exports = {
    blogRouter
}