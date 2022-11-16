const jwt = require('jsonwebtoken');
module.exports= (req, res, next) => { 
    if(!req.headers['authorization']){
        return res.status(401).json({errors: [{msg: "authorization token needed"}]})
    }
    try {
        const authHeaders = req.headers['authorization'];
        const token = authHeaders.split('Bearer ')[1];
        jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        return res.status(401).json({errors: [{msg: error.message}]})
    }
};