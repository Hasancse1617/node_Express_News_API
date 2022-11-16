const News = require("../models/News");

module.exports.createNews = async(req, res) =>{
    const { title, description} = req.body;
    const errors = [];
    if(title === ''){
        errors.push({msg: 'Name is required'});
    }
    if(description === ''){
        errors.push({msg: 'Email is required'});
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }
    else{
        try {
            const response = await News.create({
                title,
                description
            });
            return res.status(200).json({msg: 'News Created successfully!', response});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}

module.exports.editNews = async(req, res) =>{
    try {
        const id = req.params.id;
        const response = await News.findOne({_id:id});
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.updateNews = async(req, res) =>{
    const { title, description} = req.body;
    const id = req.params.id;
    const errors = [];
    if(title === ''){
        errors.push({msg: 'Title is required'});
    }
    if(description === ''){
        errors.push({msg: 'Description is required'});
    }

    if(errors.length !== 0){
        return res.status(400).json({errors});
    }
    else{
        try {
            const response = await News.findByIdAndUpdate(id,{
                title,
                description
            }, {new:true});
            return res.status(200).json({msg: 'News Updated successfully!', response});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}

module.exports.deleteNews = async(req, res) =>{
    try {
        const id = req.params.id;
        const response = await News.findByIdAndDelete(id);
        return res.status(200).json({msg: 'News Deleted successfully!', response});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}