const express=require('express');
const router=new express.Router();
const bcrypt=require("bcryptjs");
const auth=require("../middleware/auth")
const multer=require("multer")
const path=require("path");

const User = require("../model/user");
router.use(express.static('public'));

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/userImage'),function(error,success){
            if (error) throw error
        });
    },
    filename:function(req,file,cb){
        const name=Date.now()+'_'+file.originalname;
        cb(null,name,function(error1,success1){
            if(error1) throw  error1
        })
    }
})

const upload= multer({storage:storage});



router.post("/user",upload.single('image'),async (req, res) => {

    try {
        const spassword=await bcrypt.hash(req.body.password,12);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password:spassword,   
            address: req.body.address,
            image:req.file.filename
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

router.post('/user/login', async (req, res) => {
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

router.get("/user/:id",auth,async(req,res)=>{
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

router.patch("/user/:id",auth,async(req,res)=>{
    try {
        const _id =req.params.id;
        const updateuser = await User.findByIdAndUpdate(_id,req.body);
        res.send(updateuser);
    } catch (error) {
        res.status(404).send(error);
    }
})

module.exports = router;