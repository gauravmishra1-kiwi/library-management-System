const mongooes= require("mongoose");
const validator=require("validator");

const UserSchema=new mongooes.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:[true,"Email is already present"],
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        required:true
       },
   BookId:{
    type:mongooes.Schema.Types.ObjectId,
   },
   tokens:[{
    token:{
        type:String,
        required:true
    }
   }],
})


const user =new mongooes.model("user",UserSchema); 
module.exports =user;


