const mongoose = require("mongoose")
require("dotenv").config()

const app = require("./app")


mongoose.connect(process.env.DATABASE)
.then(()=> {
  console.log('database connected successfully')
})


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server running at port ${port}`)
})
