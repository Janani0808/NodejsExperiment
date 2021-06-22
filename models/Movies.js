const mongoose = require('mongoose');
const MoviesSchema = new mongoose.Schema({
plot: {
type: String
},
genres: {
type: Array
},
runtime: {
    type: Number
},
cast: {
    type: Array,
},
num_mflix_comments: {
    type: Number,
},
title: {
        type: String,
        required: true
},
full_plot: {
    type: String
},
countries: {
    type: String,
},
released: {
    type: Date,
},
directors: {
    type: Array,
},
rated: {
    type: String,
},
awards: {
    type: Object,
},
lastupdated: {
    type: String,
},
year: {
    type: Number,
},
imdb: {
    type: Object,
},
type: {
    type: String,
},
tomatoes: {
    type: Object,
},
languages: {
    type: String,
},
poster: {
    type: String,
},
})
module.exports = mongoose.model('Movies',MoviesSchema);