const express=require('express');
const bcrypt=require("bcryptjs");
const auth=require("../middleware/auth")

const User = require("../model/user");
const Book = require("../model/book");


const router=new express.Router();
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
        const token = await user.generateAuthToken();
        return res.status(201).send({ message: 'User register successfully', data: user, token, status: 201 });
        console.log(req.body);
    }
    catch (err) {
        res.send(err);
    }
})

router.post('/admin/login', async (req, res) => {
    try {
        
        const user = await User.findByCredentials(req.body.email, req.body.password)
        
        const token = await user.generateAuthToken() 
                  //*********** */
        res.status(200).send({message:'User login successfully', data:user, status : 200 })
    } catch (e) {
        console.log("error => ",e)
        res.status(400).send({message:'Enter the correct credidentials', data:null, status : 400 })
    }
})

//check all data
router.get("/admin/get",async(req,res)=>{
    try {
        const userData = await User.find();
        res.send(userData);
    } catch (error) {
        res.send(error)
    }
})

router.get("/admin/get-book",async(req,res)=>{
    try {
        const bookData = await Book.find();
        res.send(bookData);
    } catch (error) {
        res.send(error)
    }
})

router.get("/admin/:id", auth, async(req,res)=>{
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

router.patch("/admin/:id",auth,async(req,res)=>{
    try {
        const _id =req.params.id;
        const updateuser = await User.findByIdAndUpdate(_id,req.body);
        res.send(updateuser);
    } catch (error) {
        res.status(404).send(error);
    }
})

router.delete("/admin/:id",auth,async(req,res)=>{
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

module.exports = router;