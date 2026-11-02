import React from "react";
import { Link } from "react-router-dom";
import { useWatchlist } from "../../context/WatchlistContext";

import "./Watchlist.css";

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="watchlist">
      <h1>My List</h1>

      {watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <h2>Your watchlist is empty</h2>
          <p>Add movies to your list and they will appear here.</p>

          <Link to="/">
            <button>Browse Movies</button>
          </Link>
        </div>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              className="watchlist-card"
              key={movie.id}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />

              <div className="watchlist-card-info">
                <h3>{movie.title}</h3>

                <div className="watchlist-meta">
                  <span>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>

                  <span>{movie.release_date?.slice(0, 4)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
