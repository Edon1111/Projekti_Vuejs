var Rating = require("../models/Rating");

module.exports.controller = app => {
  // fetch all ratings
  app.get("/ratings", (req, res) => {
    Rating.find({}, "movie_id user_id rate ", { sort: { _id: -1 } }, function(
      error,
      ratings
    ) {
      if (error) {
        console.log(error);
      }
      res.send({
        ratings: ratings
      });
    });
  });

  // fetch a single movie
  //   app.get("/api/movies/:id", (req, res) => {
  //     Movie.findById(
  //       req.params.id,
  //       "name description release_year genre originalLanguage runTime moreDescription",
  //       (error, movie) => {
  //         if (error) {
  //           console.error(error);
  //         }
  //         res.send(movie);
  //       }
  //     );
  //   });

  // add a new movie
};
