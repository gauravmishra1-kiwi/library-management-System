const jwt = require('jsonwebtoken')
const User = require('../model/user')
const adminauth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, "thisismysecaratekeythatsto")      // verify token
       
        const user = await User.findById(decoded._id);
        
        req.user =  user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}


module.exports = adminauth

