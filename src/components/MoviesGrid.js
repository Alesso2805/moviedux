import { useState, useEffect } from "react";
import React from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

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
            {
                movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))
            }
            </div>
    );
}   