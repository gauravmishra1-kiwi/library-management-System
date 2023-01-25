const jwt = require('jsonwebtoken')
const User = require('../model/user')
const fs = require('fs')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')

        const decoded = jwt.verify(token, "thisismysecaratekeythatstorevalue")       // verify token

        req.user =  decoded._id
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth

