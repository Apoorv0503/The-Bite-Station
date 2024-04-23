const express= require('express');
const mongoose=require("mongoose");
const resRoutes=require("./routes/res.routes");

//we only make a single server using this express()
const app=express();
app.use(express.json());


//user routes
app.use("/res",resRoutes);


// mongoose.connect(`${process.env.DB_URI}`)
// .then(()=> console.log("connected to DB at:",process.env.DB_URI))
// .catch((e) => console.log("Failed to connect to DB", e));

app.listen(8082,()=>{
    console.log("express server is listening on port "+8082);
});