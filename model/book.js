const mongoose= require("mongoose");
const validator=require("validator");

const BookSchema=new mongoose.Schema({
    bookId :{
        type : String,
        required : true,
        unique : true
    },
    name : {
        type:String,
        required:true
    },
    author : {
        type:String,
        required:true
    },
    ownerId : {
        type : mongoose.Schema.Types.ObjectId,
    },
    issue:{
        type:Boolean,
        default:false
    }
})


const book =new mongoose.model("book", BookSchema); 
module.exports =book;
