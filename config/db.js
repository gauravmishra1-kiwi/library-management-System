const mongoose= require("mongoose");

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://gaurav:Gaurav12@cluster0.o6zgubf.mongodb.net/Wissen_Liberary",{
    // useCreateIndex:true,
    // useNewUrlParser:true,
    // useUnifiedTopology:true
}).then(()=>{                                  
    console.log("connection is sucessfully..");
}).catch((e)=>{
    console.log("connection error",e);
})         
