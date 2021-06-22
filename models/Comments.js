const mongoose = require('mongoose');
const commentsSchema = new mongoose.Schema({
name: {
type: String,
required: true
},
email: {
type: String
},
movie_id: {
    type: String,
    required: true
},
text: {
    type: String,
    required: true
},
date: {
    type: Date,
}
})
module.exports = mongoose.model('Comments',commentsSchema);