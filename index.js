
const express = require("express")
require("dotenv").config()

const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { blogRouter } = require("./routes/blog.routes")



const app = express()
app.use(express.json())
app.use(cors())


app.use("/api", userRouter)
app.use("/api", blogRouter)



app.listen(process.env.port, async() => {
      try {

        await connection
        console.log("connected to db")
        console.log(`port is running at ${process.env.port}`)
        
      } catch (error) {
         console.log(error)
      }
})