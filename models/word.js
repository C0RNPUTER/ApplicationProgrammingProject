const mongoose = require('mongoose');

// 슨키마
const WordSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    category: {
        type: String,
        trim: true,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//model(ModelName, Schema, CollectionName)
const Word = mongoose.model("word", WordSchema);
module.exports = Word;