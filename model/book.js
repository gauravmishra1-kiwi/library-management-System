const { default: mongoose } = require("mongoose");
const mongooes= require("mongoose");
const validator=require("validator");

const BookSchema=new mongooes.Schema({
    name : {
        type:String,
        required:true,
        unique:true,
    },
    author : {
        type:String,
        required:true,
    },
})


const book =new mongooes.model("book",BookSchema); 
module.exports =book;


