import React, { useState } from "react";
import axios from "axios";
import './CSS/AllMovies.css';
import Header from "../../shared/HomeHeader";
import { Link } from "react-router-dom";
export default function AddMovie() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [poster, setPoster] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [languages, setLanguages] = useState("");
  const [runtime, setRuntime] = useState("");
  const [Rating, setRating] = useState("");
  const [error, setError] = useState("");

  // Validation function to check if the input is not empty
  const isNotEmpty = (value) => value.trim() !== "";

  // This will execute after clicking the submit button
  function sendData(e) {
    e.preventDefault();

    // Validation
    if (
      !isNotEmpty(title) ||
      !isNotEmpty(genre) ||
      !isNotEmpty(poster) ||
      !isNotEmpty(releaseDate) ||
      !isNotEmpty(languages) ||
      !isNotEmpty(runtime) ||
      !isNotEmpty(Rating)
    ) {
      setError("All fields are required");
      return;
    }

    if (!(Rating <= 5)) {
      setError("Enter rating between 0 - 5 ");
      return;
    }

    const newMovie = {
      title,
      genre,
      poster,
      releaseDate,
      languages,
      runtime,
      Rating,
    };

    axios
      .post("/movie/addMovie", newMovie)
      .then(() => {
        alert("Movie added");
        // Clear input fields after successful submission
        setTitle("");
        setGenre("");
        setPoster("");
        setReleaseDate("");
        setLanguages("");
        setRuntime("");
        setRating("");
        setError("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <Header/>
      <Link to="/movie">
    <img className="ima4" src={"https://www.freeiconspng.com/thumbs/return-button-png/back-undo-return-button-png-5.png"} alt="My Image" width="50px" height= "50px" />
    </Link>
    <div className="container1">
      <br />
      <br />
      <form onSubmit={sendData}>
        <div className="mb-3">
          <label htmlFor="title" className="c2">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="genre" className="c2">
            Genre
          </label>
          <select
            className="form-select"
            id="genre"
            onChange={(e) => {
              setGenre(e.target.value);
            }}
            value={genre}
          >
            <option value="">Select Genre</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Science Fiction">Science Fiction</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="poster" className="c2">
          Poster Image Link
          </label>
          <input
            type="text"
            className="form-control"
            id="poster"
            onChange={(e) => {
              setPoster(e.target.value);
            }}
            value={poster}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="releasedate" className="c2">
          Release Date
          </label>
          <input
            type="text"
            className="form-control"
            id="releasedate"
            aria-describedby="emailHelp"
            onChange={(e) => {
              setReleaseDate(e.target.value);
            }}
            value={releaseDate}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="languages" className="c2">
          Languages
          </label>

          <input
            type="text"
            className="form-control"
            id="languages"
            aria-describedby="emailHelp"
            onChange={(e) => {
              setLanguages(e.target.value);
            }}
            value={languages}
          />
          </div>

        <div className="mb-3">
          <label htmlFor="runtime" className="c2">
            Runtime
          </label>
          <input
            type="number"
            className="form-control"
            id="runtime"
            onChange={(e) => {
              setRuntime(e.target.value);
            }}
            value={runtime}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rating" className="c2">
            Rating
          </label>
          <input
            type="number"
            className="form-control"
            id="rating"
            onChange={(e) => {
              setRating(e.target.value);
            }}
            value={Rating}
          />
        </div>

        <div className="text-danger">{error}</div>

        <button type="submit" className="btn2">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}
