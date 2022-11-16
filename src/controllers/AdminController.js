const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_decode = require('jwt-decode');

const createToken = (chairman, expiresToken)=>{
    return jwt.sign({chairman}, process.env.SECRET, {
        expiresIn: expiresToken
    });
}
module.exports.loginAdmin = async(req, res)=>{
    const { email, password } = req.body;
    const errors = [];
    if(email === ''){
        errors.push({msg: 'Email is required'});
    }
    if(password === ''){
        errors.push({msg: 'Password is required'});
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }
    let expiresToken = '1d';
    try{
        const admin = await User.findOne({ email, user_type:"SuperAdmin" });
        if(admin){
            const matched = await bcrypt.compare(password, admin.password);
            if(matched){
                try {
                    const token = createToken(admin,expiresToken);
                    return res.status(200).json({'msg':'You have successfully login',token});
                } catch (error) {
                    return res.status(500).json({errors: [{msg: error.message}]});
                }
            }else{
                return res.status(401).json({errors:[{msg:'Password does not matched'}]});
            }
        }
        else{
            return res.status(404).json({errors:[{msg:'Email not found'}]});
        }
    }catch(error){
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.registerAdmin = async(req, res)=>{
    const { name, email, password} = req.body;
    const errors = [];
    if(name === ''){
        errors.push({msg: 'Name is required'});
    }
    if(email === ''){
        errors.push({msg: 'Email is required'});
    }else{
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Email validation
        if(!filter.test(email)){
            errors.push({msg: 'Valid email is required'});
        }
    }
    if(password === ''){
        errors.push({msg: 'Password is required'});
    }else{
        if(password.length < 6){
            errors.push({msg: 'Password must be 6 characters long!!!'});
        }
    }
    const checkAdmin = await User.find();
    if(checkAdmin.length > 0){
        errors.push({msg:'Admin already exists!!!'});
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }
    else{
        // Hash Paaword
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        try {
            const response = await User.create({
                name,
                email,
                password: hash,
                user_type:"SuperAdmin",
            });
            
            return res.status(200).json({msg: 'Created successfully!', response});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}