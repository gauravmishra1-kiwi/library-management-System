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
    status: {
        type: String,
        enum: ['Issued', 'Available'],
        default: 'Available',
        required: true
      },
      ownerId : {
        type : mongoose.Schema.Types.ObjectId,
    },
      issue_date: {
        type:Date,
      },
      return_date: {
        type:Date,
      }
      
})


const book =new mongoose.model("book", BookSchema); 
module.exports =book;
