const express=require('express');
const router=new express.Router();
const bcrypt=require("bcryptjs")

const User = require("../model/user");

router.post("/", async (req, res) => {

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

module.exports = router;