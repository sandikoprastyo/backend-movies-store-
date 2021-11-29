const router = require("express").Router();
const Movie = require("../models/Movies.js");

//? get all movies
router.get('/', (req, res) => {
    Movie.find()
    .then((Movie) => res.json({
      status: 200,
      success: true,
      data: Movie,
    }))
    .catch((err) => res.status(400).json("Error: " + err));
});


//? post data movies
router.post('/', async (req, res) => {
  const dataMovies = new Movie({
    title: req.body.title,
    year: req.body.year,
    genres: req.body.genres,
    posterurl: req.body.posterurl,
    contentRating: req.body.contentRating,
    releaseDate: req.body.releaseDate,
    storyline: req.body.storyline,
    actors: req.body.actors,
    imdbRating: req.body.imdbRating,
  });
  try {
    const saveDataMovies = await dataMovies.save();
    res.json(saveDataMovies);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;