var fs = require('fs');
const express = require('express');
require('dotenv').config();
const Movie = require("./models/Movies");
const Comments = require("./models/Comments");
const app = express();

const mongoose = require("mongoose");
//connection to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
console.log("Connected to db!");
});

async function findMoviesWithComments(){
  const pipeline = 
    [
      {
        '$lookup': {
          'from': 'comments', 
          'localField': '_id', 
          'foreignField': 'movie_id', 
          'as': 'movie_comments'
        }
      }, {
        '$match': {
          'movie_comments.name': {
            '$exists': true
          }
        }
      }, {
        '$limit': 30
      }
    ]
    const aggCursor =  Movie.aggregate(pipeline);

     return aggCursor;
  }

async function findMovieTypeWithImdb(type, min_imdb, max_imdb, maxNumberToPrint){

  const pipeline = [
              {
                '$match': {
                  'type': type
                }
              }, {
                '$match': {
                  'imdb': {
                    '$gt': {
                      'rating': min_imdb
                    }
                  }
                }
              }, {
                '$match': {
                  'imdb': {
                    '$lte': {
                      'rating': max_imdb
                    }
                  }
                }
              }, {
                '$sort': {
                  'imdb': -1
                }
              }, {
                '$limit': maxNumberToPrint
              }
  ]

  const aggCursor = await Movie.aggregate(pipeline);

return aggCursor;  
}
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded());
app.use(express.json());

//app.set('views', './views');
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

app.get('/ImdbRatingView',async (req, res) => {
  let movies = await findMovieTypeWithImdb("movie", 8, 10, 10);
    //let something =[{'title':'abs', 'imdb': {'rating': 9}}, {'title': 'qwe','imdb':{'rating': 8.9}}]
    res.render('ImdbRatingView.ejs', {'aggCursor': movies});
    });

app.get('/',(req,res) => {
      res.render('view.ejs');
});

app.get('/MoviesWithComments', async (req,res) => {
  //throw new Error("Something went wrong!");
  let movies_with_comments = await findMoviesWithComments();
  res.render('MoviesWithComments.ejs', {'aggCursor': movies_with_comments});
});

app.route('/text_manipulation').post((req, res) => {
  let writer = fs.createWriteStream('./output', {flags:'a'}) ;
        writer.write(req.body.feeling + "\n");
        
        res.redirect("/");
});

app.use((req, res, next) => {
  res.status(404).render('Error.ejs');
 })

 const port = process.env.PORT || 3000;

 app.listen(port, () => console.log(`Server running on port ${port}`));

