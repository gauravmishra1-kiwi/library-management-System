const mongooes= require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs")

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
    address:{
        type:String,
        required:true
       },   
   role:{
    type:String,
    default:"user"
   },
   tokens:[{
    token:{
        type:String,
    }
   }],
})

UserSchema.methods.generateAuthToken=async function(){
    try {
        console.log(this._id);
        const token=jwt.sign({_id:this._id.toString()},"thisismysecaratekeythatstorevalue");
        console.log();
        this.tokens=this.tokens.concat({token:token});
        await this.save(); 
        console.log(token);
        return token;
    } catch (e) {
        res.send("token genrate error")
    }
}

const user =new mongooes.model("user",UserSchema); 
module.exports =user;


