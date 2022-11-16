const { model, Schema } = require("mongoose");

const newsSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
}, {timestamps: true}); 

module.exports = model("news", newsSchema);