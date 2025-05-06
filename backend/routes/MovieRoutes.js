const router = require("express").Router();


let Movie = require("../models/Movie");



//Add movie details
router.route("/addMovie").post((req, res) => {

    const title = req.body.title;
    const genre = req.body.genre;
    const director = req.body.director;
    const releaseDate = req.body.releaseDate;
    const languages = req.body.languages;
    const runtime = req.body.runtime;
    const Rating = req.body.Rating;

    const newStudent = new Movie(
        {
            title,
            genre,
            director,
            releaseDate,
            languages,
            runtime,
            Rating,
        })
    newStudent.save().then(() => {
        res.json("Movie Added")
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/").get((req, res) => {
    Movie.find().then((Movie) => {
        res.json(Movie)
    }).catch((err) => {
        console.log(err)
    })
})


router.route("/update").put(async (req, res) => {
    const { userId, title, genre, director, releaseDate, languages, runtime, Rating } = req.body;

    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            userId,
            {
                title,
                genre,
                director,
                releaseDate,
                languages,
                runtime,
                Rating,
            },
            { new: true } // This option returns the updated document
        );

        if (!updatedMovie) {
            return res.status(404).json({ status: 'Movie not found' });
        }

        res.status(200).json({ status: 'Movie updated', updatedMovie });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'Error with updating data' });
    }
});



router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    try {
        await Movie.findByIdAndDelete(userId);
        res.status(200).send({ status: "user deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting data" });
    }
});


router.route("/getOne/:movieId").get(async (req, res) => {
    const { movieId } = req.params;

    try {
        // Find the movie by ID
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const {
            title,
            genre,
            director,
            releaseDate,
            languages,
            runtime,
            Rating,
        } = movie;

        res.json({
            title,
            genre,
            director,
            releaseDate,
            languages,
            runtime,
            Rating,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
})


module.exports = router;