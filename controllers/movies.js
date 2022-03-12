var Movie = require("../models/Movie");
const Rating = require("../models/Rating");
const passport = require("passport");

module.exports.controller = app => {
  // fetch all movies
  app.get("/movies", (req, res) => {
    Movie.find(
      {},
      "name description thumbNail movieUrl release_year genre originalLanguage runTime moreDescription",
      { sort: { _id: -1 } },
      function(error, movies) {
        if (error) {
          console.log(error);
        }
        res.send({
          movies: movies
        });
      }
    );
  });

  // fetch a single movie
  app.get("/api/movies/:id", (req, res) => {
    Movie.findById(
      req.params.id,
      "name description thumbNail movieUrl release_year genre originalLanguage runTime moreDescription",
      (error, movie) => {
        if (error) {
          console.error(error);
        }
        res.send(movie);
      }
    );
  });

  // rate a movie
  app.post("/movies/rate/:id", (req, res) => {
    const rating = new Rating({
      movie_id: req.params.id,
      user_id: req.body.user_id,
      rate: req.body.rate
    });
    rating.save(function(error, rating) {
      if (error) {
        console.log(error);
      }
      res.send({
        movie_id: rating.movie_id,
        user_id: rating.user_id,
        rate: rating.rate
      });
    });
  });

  // add a new movie
  app.post("/movies", (req, res) => {
    const movie = new Movie({
      name: req.body.name,
      description: req.body.description,
      thumbNail: req.body.thumbNail,
      movieUrl: req.body.movieUrl,
      release_year: req.body.release_year,
      genre: req.body.genre,
      originalLanguage: req.body.originalLanguage,
      runTime: req.body.runTime,
      moreDescription: req.body.moreDescription
    });

    movie.save(function(error, movie) {
      if (error) {
        console.log(error);
      }
      res.send(movie);
    });
  });

  // delete a movie
  app.delete("/movies/:id", (req, res) => {
    Movie.remove(
      {
        _id: req.params.id
      },
      function(error, movie) {
        if (error) {
          console.error(error);
        }
        res.send({ success: true });
      }
    );
  });

  // update a movie
  app.put("/movies/:id", (req, res) => {
    Movie.findById(
      req.params.id,
      "name description thumbNail movieUrl release_year genre originalLanguage runTime moreDescription",
      function(error, movie) {
        if (error) {
          console.error(error);
        }
        movie.name = req.body.name;
        movie.description = req.body.description;
        movie.thumbNail = req.body.thumbNail;
        movie.movieUrl = req.body.movieUrl;
        movie.release_year = req.body.release_year;
        movie.genre = req.body.genre;
        movie.originalLanguage = req.body.originalLanguage;
        movie.runTime = req.body.runTime;
        movie.moreDescription = req.body.moreDescription;
        movie.save(function(error, movie) {
          if (error) {
            console.log(error);
          }
          res.send(movie);
        });
      }
    );
  });
};
