import React, { useState, useEffect } from "react";
import axios from "axios";
import './CSS/AllMovies.css';
import './CSS/Home.css';
import './myScript';
import Header from "../../shared/HomeHeader";
import { Link } from "react-router-dom";
import { LinkedinFilled, FacebookFilled, InstagramFilled, TwitterSquareFilled } from '@ant-design/icons';

export default function HomeMain() {
  const [movies, setMovies] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get("/movie/");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
  }, []);

  // Slideshow logic
  useEffect(() => {
    if (movies.length < 2) return;
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setSlideIndex((prev) => (prev + 1) % Math.min(5, movies.length));
        setAnimating(false);
      }, 400); // match animation duration
    }, 3500);
    return () => clearInterval(interval);
  }, [movies]);

  const getPoster = (movie) => movie.director || "https://m.media-amazon.com/images/M/MV5BYzEwZjczOTktYzU1OS00YjJlLTgyY2UtNWEzODBlN2RjZDEwXkEyXkFqcGc@._V1_QL75_UX380_CR0,20,380,562_.jpg";

  // Only use the first 5 movies for the slideshow
  const heroMovies = movies.slice(0, 5);
  const currentMovie = heroMovies[slideIndex] || {};
  const bgPoster = getPoster(currentMovie);

  return (
    <div className="home-main-container">
      <Header />
      {/* Hero Slideshow Section */}
      <section
        className="hero-section hero-slideshow-section"
        style={{
          backgroundImage: `url(${bgPoster})`,
        }}
      >
        <div className={`hero-content hero-slide-anim${animating ? ' animating' : ''}`}>
          {currentMovie && (
            <>
              <img
                className="hero-poster"
                src={bgPoster}
                alt={currentMovie.title}
              />
              <div className="hero-info">
                <h1>{currentMovie.title}</h1>
                <p>{currentMovie.Rating?.slice(0, 120) || "No description available."}</p>
                <Link to={`/details/${currentMovie._id}`} className="hero-btn">View Details</Link>
                <div className="hero-slideshow-controls">
                  {heroMovies.map((_, idx) => (
                    <span
                      key={idx}
                      className={`hero-dot${slideIndex === idx ? ' active' : ''}`}
                      onClick={() => setSlideIndex(idx)}
                    ></span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Popular Movies Section */}
      <section className="movies-section">
        <h2 className="section-title">Popular Movies</h2>
        <div className="movies-grid">
          {movies.slice(1, 6).map((movie) => (
            <div className="movie-card" key={movie._id}>
              <Link to={`/details/${movie._id}`}>
                <img className="movie-poster" src={getPoster(movie)} alt={movie.title} />
              </Link>
              <h3 className="movie-title">{movie.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Movies Section */}
      <section className="movies-section recommended">
        <h2 className="section-title">Recommended Movies</h2>
        <div className="movies-grid">
          {movies.slice(6, 11).map((movie) => (
            <div className="movie-card" key={movie._id}>
              <Link to={`/details/${movie._id}`}>
                <img className="movie-poster" src={getPoster(movie)} alt={movie.title} />
              </Link>
              <h3 className="movie-title">{movie.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer-modern">
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-col about">
              <h6>About Galaxy Cinema</h6>
              <p>Galaxy Cinema revolutionizes your movie experience with seamless ticketing, concessions, and scheduling. Enjoy the magic of cinema with us!</p>
            </div>
            <div className="footer-col links">
              <h6>Quick Links</h6>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/movies">Movies</Link></li>
              </ul>
            </div>
            <div className="footer-col contact">
              <h6>Contact</h6>
              <ul>
                <li>Email: info@galaxycinema.com</li>
                <li>Phone: +1 234 567 890</li>
                <li>Location: 123 Movie Lane, Film City</li>
              </ul>
            </div>
            <div className="footer-col social">
              <h6>Follow Us</h6>
              <div className="footer-social-icons">
                <a href="#" aria-label="Facebook" className="footer-icon facebook"><FacebookFilled /></a>
                <a href="#" aria-label="Twitter" className="footer-icon twitter"><TwitterSquareFilled /></a>
                <a href="#" aria-label="Instagram" className="footer-icon instagram"><InstagramFilled /></a>
                <a href="#" aria-label="LinkedIn" className="footer-icon linkedin"><LinkedinFilled /></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Galaxy Cinema. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
