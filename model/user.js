const mongooes= require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const multer=require("multer")

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
    type: String,
    enum: ['admin', 'sub-admin', 'user'],
    default:'user'
   },
   image:String,
   tokens:[{
    token:{
        type:String,
    }
   }],
//    bookinfo:[
//     {
//         id_info: {
//             id:{
//                 type:mongooes.Schema.Types.ObjectId,
//                 ref:'activity'
//             },
//             issueDate: Date,
//             returnbook: Date
//         }
//     }
//    ],
   responsibilitys:{
    type:Boolean,
    default:false
   }
})

//token for user
UserSchema.methods.generateAuthToken=async function(){
    try {
        console.log(this._id);
        const token=jwt.sign({_id:this._id.toString()},"thisismysecaratekeythatstorevalue");
        this.tokens=this.tokens.concat({token:token});
        await this.save(); 
        console.log(token);
        return token;
    } catch (e) {
        res.send("token genrate error")
    }
}

//token for admin
UserSchema.methods.generateAuthTokenadmin=async function(){
    try {
        console.log(this._id);
        const token=jwt.sign({_id:this._id.toString(),role:this.role.toString()},"thisismysecaratekeythatsto");
        this.tokens=this.tokens.concat({token:token});
        await this.save(); 
        console.log(token);
        return token;
    } catch (e) {
        res.send("token genrate error")
    }
}

// UserSchema.methods.permission=async function(){
//     try {
//         const update="updateuser"
//         const retrn= "returnuser";
//         const responsibility=update && retrn;
//         this.responsibilitys=this.responsibility.concat({responsibility:responsibility});
//         await this.save();
//         return responsibility;
//     } catch (error) {
//         res.send("you entered a wrong")
//     }
// }
UserSchema.statics.findByCredentials=async(email,password)=>{
    const User=await user.findOne({email})
    if(!User){
        throw new Error('Unable to login')
    }
    
    const ismatch = await bcrypt.compare(password, User.password)
   
    if(!ismatch){
        throw new Error('Unable to login')
    }

    return User
}
const user =new mongooes.model("user",UserSchema); 
module.exports =user;


