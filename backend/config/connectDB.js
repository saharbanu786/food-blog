const mongoose=require("mongoose")

const connectDB=async()=>{
    await mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>console.log("MongoDB is Connected Successfully..."))
}

module.exports=connectDB