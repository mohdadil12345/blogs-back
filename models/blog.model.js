
const mongoose = require("mongoose")

const blogSchema = ({
    username : String,
    title : String,
    content : String,
    category : String,
    date : String,
    likes : Number,
    comments : {
        type : Array,
        default : []
    },
})

const blogModel = mongoose.model("blog",blogSchema)

module.exports = {
    blogModel
}