const mongoose= require("mongoose");

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/Wissen_Liberary",{
    // useCreateIndex:true,
    // useNewUrlParser:true,
    // useUnifiedTopology:true
}).then(()=>{                                  
    console.log("connection is sucessfully..");
}).catch((e)=>{
    console.log("connection error",e);
})         
