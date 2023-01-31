const express=require('express');
const bcrypt=require("bcryptjs");
const subadmin_auth=require("../middleware/subadmin_auth")

const User = require("../model/user");


const router=new express.Router();

router.post('/subadmin/login', async (req, res) => {
    try {
        
        const admin = await User.findOne({role : 'admin'});
        
        const user = await User.findByCredentials(req.body.email, req.body.password)
        
        if(!admin){
            return res.send('Please create a admin first');
        }

        if(admin.status === 'active'){
            user.tokens = [];
            await user.save();
            return res.send('Admin is active right now. Subadmin cannot login');

        }
        
        
        const token = await user.generateAuthTokensubadmin() 
                  //*********** */
        res.status(200).send({message:'User login successfully', data:user, status : 200 })
    } catch (e) {
        console.log("error => ",e)
        res.status(400).send({message:'Enter the correct credidentials', data:null, status : 400 })
    }
})

router.patch("/subadmin/:id",subadmin_auth,async(req,res)=>{
    try {
        const _id =req.params.id;
        const updateuser = await User.findByIdAndUpdate(_id,req.body);
        res.send(updateuser);
    } catch (error) {
        res.status(404).send(error);
    }
})

module.exports = router;