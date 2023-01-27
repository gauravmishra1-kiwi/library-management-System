const express=require('express');
const bcrypt=require("bcryptjs");
const auth=require("../middleware/auth")
const admin_middleware=require("../middleware/adminauth")

const User = require("../model/user");
const Book = require("../model/book");


const router=new express.Router();

//admin signup
router.post("/admin",async (req, res) => {

    try {
        const spassword=await bcrypt.hash(req.body.password,12);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password:spassword,   
            address: req.body.address,
            role:req.body.role,
        })
        await user.save(user);
        const token = await user.generateAuthTokenadmin();
        return res.status(201).send({ message: 'User register successfully', data: user, token, status: 201 });
        console.log(req.body);
    }
    catch (err) {
        res.send(err);
    }
})

//admin login
router.post('/admin/login', async (req, res) => {
    try {
        
        const user = await User.findByCredentials(req.body.email, req.body.password)
        
        const token = await user.generateAuthTokenadmin() 
                  //*********** */
        res.status(200).send({message:'User login successfully', data:user, status : 200 })
    } catch (e) {
        console.log("error => ",e)
        res.status(400).send({message:'Enter the correct credidentials', data:null, status : 400 })
    }
})

//check all data of user
router.get("/admin/get",admin_middleware,async(req,res)=>{
    try {
        const userData = await User.find();
        res.send(userData);
    } catch (error) {
        res.send(error)
    }
})

//check all data of book
router.get("/admin/get-book",admin_middleware,async(req,res)=>{
    try {
        const bookData = await Book.find();
        res.send(bookData);
    } catch (error) {
        res.send(error)
    }
})

// check user from id
router.get("/admin/:id", admin_middleware, async(req,res)=>{
    try {
        const _id =req.params.id;
        const userData = await User.findById(_id);
        res.send(userData);

        if (!userData) {
            return res.status(404).send();
        } else {
            res.send(userData);
        }
    } catch (error) {
        res.send(error)
    }
})

//update user
router.patch("/admin/:id",admin_middleware,async(req,res)=>{
    try {
        const _id =req.params.id;
        const updateuser = await User.findByIdAndUpdate(_id,req.body);
        res.send(updateuser);
    } catch (error) {
        res.status(404).send(error);
    }
})

//delete user
router.delete("/admin/:id",admin_middleware,async(req,res)=>{
    try {
        const deleteUser= await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(404).send();
        }
        res.send(deleteUser);
    } catch (error) {
        res.send(error)
    }
})

//add book
router.post("/add/book",admin_middleware, async (req, res) => {
    try {
        const book = new Book({
            bookId : req.body.bookId,
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

//delete books
router.delete("/books/:id",admin_middleware,async(req,res)=>{
    try {
        const deleteBooks= await Book.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(404).send();
        }
        res.send(deleteBooks);
    } catch (error) {
        res.send(error)
    }
})

//update user
router.patch("/admin_user/:id",admin_middleware,async(req,res)=>{
    try {
        const _id =req.params.id;
        const updateuser = await User.findByIdAndUpdate(_id,req.body);
        res.send(updateuser);
    } catch (error) {
        res.status(404).send(error);
    }
})


//update the role
router.patch("role/:id",admin_middleware,async(req,res)=>{
    try {
        const _id =req.params.id;
        const updateuser = await User.findByIdAndUpdate(_id,req.body.role);
        res.send(updateuser);
    } catch (error) {
        res.status(404).send(error);
    }
})

//responsibilitiy
router.patch("/reponsibility/:id",admin_middleware,async(req,res)=>{
    try {
        const subadmin = await User.findById(req.params.id);
        if(subadmin.role!=='sub-admin'){
            return res.send("firlstly make as a sub-admin")
        }
        subadmin.responsibilitys = req.body.responsibilitys;
        await subadmin.save();
        res.status(200).send("permission is given to sub-admin");
    } catch (error) {
        res.status(400).send("unable fetch responsibility");
    }


})

//book issue
router.post('/book/issue', admin_middleware, async(req, res)=>{
    const userid=req.body.userId;
    const bookId = req.body.bookId;
    try {
        const user=await User.findById(userid);
        if (!user) {
            res.send("invalid user id");
            return ;
        }
        console.log(user);
        const book = await Book.findOne({bookId});
        if(!book){
            throw new Error('Invalid book id');
        }
        console.log(book);
        
        if(book.issue){
            throw new Error('Book is already issued');
        }

        book.ownerId = user._id;
        book.issue = true;
        await book.save();

        res.send('Book issued')
    } catch (error) {
        res.status(400).send({error : error.message});
    }
})
module.exports = router;