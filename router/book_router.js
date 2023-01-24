const express=require('express');
const router=new express.Router();

const Book = require("../model/book");


router.post("/add", async (req, res) => {
    try {
        const book = new Book({
            name: req.body.name,
            author: req.body.author,
        })
        await book.save(book)
        console.log(req.body);
         res.status(201).send({ message: 'Book added successfully', data: book, status: 201 })
    }
    catch (err) {
        res.send(err);
    }
})


router.get("/",async(req,res)=>{
    try {
        const BooksData = await Book.find();
        res.send(BooksData);
    } catch (error) {
        res.send(error)
    }
})


router.get("/books/:id",async(req,res)=>{
    try {
        const _id =req.params.id;
        const bookData = await Book.findById(_id);
        res.send(bookData);

        if (!bookData) {
            return res.status(404).send();
        } else {
            res.send(bookData);
        }
    } catch (error) {
        res.send(error)
    }
})


router.delete("/books/:id",async(req,res)=>{
    try {
        // const _id=req.params.id;
        const deleteBooks= await Book.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(404).send();
        }
        res.send(deleteBooks);
    } catch (error) {
        res.send(error)
    }
})
module.exports=router;