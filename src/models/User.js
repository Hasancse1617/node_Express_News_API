const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    user_type:{
        type: String,
        required: true
    },
    editor_status:{
        type: Boolean,
        default: false
    }
}, {timestamps: true}); 

module.exports = model("user", userSchema);