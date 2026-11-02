import React from 'react'
import "./MovieDetail.css"
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useWatchlist } from '../../context/WatchlistContext'

const MovieDetail = () => {
    const {id} = useParams()
    const {addToWatchlist, removeFromWatchlist, isInWatchlist} = useWatchlist()
    const [movie, setMovie] = useState(null)

    const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWIzZjcxNTlmNjUwYzM5MTJhMzMwMTBjODJlZTA3MiIsIm5iZiI6MTc5MzI4NzQ0NS41ODUsInN1YiI6IjZhZTM2NTE1NDQxMjExYTYyYTM4YjdkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2RnpWKcPjFVms2ANH_8JtMMYvs7mIuaYXdR46ilbm44",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        options
      )
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);

  if (!movie) {
    return (
      <div className="movie-loading">
        <img src={netflix_spinner} alt="Loading..." />
      </div>
    );
  }

  const saved = isInWatchlist(movie.id);

  return (
    <div className="movie-detail">

      <div
        className="movie-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >

        <div className="movie-overlay">

    
          <Link to="/" className="back-button">
            ← Back
          </Link>

         
          <div className="movie-container">

           
            <div className="movie-poster-wrapper">
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>

           
            <div className="movie-content">

              <h1>{movie.title}</h1>

              <div className="movie-info">
                <span className="rating">
                  ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
                </span>

                <span>
                  {movie.release_date?.slice(0, 4)}
                </span>

                <span>
                  {movie.runtime
                    ? `${movie.runtime} min`
                    : "Runtime N/A"}
                </span>
              </div>

             
              <div className="movie-genres">
                {movie.genres?.map((genre) => (
                  <span key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </div>

             
              <p className="movie-overview">
                {movie.overview || "No overview available."}
              </p>

              
              <div className="movie-buttons">

                <Link to={`/player/${movie.id}`}>
                  <button className="play-btn">
                    ▶ Play
                  </button>
                </Link>

                <button
                  className="watchlist-btn"
                  onClick={() => {
                    if (saved) {
                      removeFromWatchlist(movie.id);
                    } else {
                      addToWatchlist(movie);
                    }
                  }}
                >
                  {saved
                    ? "✓ Remove from Watchlist"
                    : "+ Add to Watchlist"}
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );  
  
}

export default MovieDetail