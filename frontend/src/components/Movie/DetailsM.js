import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../shared/HomeHeader";
import "./CSS/AllMovies.css";
import "./CSS/DetailM.css";
import { Link } from "react-router-dom";

export default function DetailsM() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(`/movie/getOne/` + movieId);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }
    fetchMovieDetails();
  }, [movieId]);

  return (
    <div>
      <Header />
      {movie ? (
        <div className="movie-detail-main">
          <div className="movie-detail-card">
            <div className="movie-detail-poster-wrap">
              <img
                className="movie-detail-poster"
                src={movie.director}
                alt={movie.title}
              />
            </div>
            <div className="movie-detail-info">
              <h1 className="movie-detail-title">{movie.title}</h1>
               <p className="movie-detail-genre">
                {movie.genre || "fiction"}
              </p>             
              <p className="movie-detail-desc">
                {movie.Rating || "No description available."}
              </p>
              <Link to={`/showtime/${movieId}`}>
                <button className="movie-detail-btn">Buy Tickets</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
}

