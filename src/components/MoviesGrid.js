import { useState, useEffect } from "react";
import React from "react";
import "../styles.css";

export default function MoviesGrid() {

    //loading movies from movies.json with images
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetch("/movies.json")
            .then(response => response.json())
            .then(data => setMovies(data));
    }, []);

    return (
        <div className="movies-grid">
            <h2 className="movies-count">Total Movies: {movies.length}</h2>
            <div className="grid">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <img src={movie.image} alt={movie.title} className="movie-image" />
                        <h3 className="movie-title">{movie.title}</h3>
                        <p className="movie-year">{movie.year}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}   