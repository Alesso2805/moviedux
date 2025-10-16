import { useState, useEffect, useMemo, useCallback } from "react";
import React from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid({movies, watchlist, toggleWatchlist}) {

    // Store all movies (never changes after initial load)
    const [allMovies, setAllMovies] = useState([]);
    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [genre, setGenre] = useState("All genres");
    const [rating, setRating] = useState("All ratings");
    const [isLoading, setIsLoading] = useState(true);

    // Load movies only once
    useEffect(() => {
        fetch("/movies.json")
            .then(response => response.json())
            .then(data => {
                setAllMovies(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error loading movies:', error);
                setIsLoading(false);
            });
    }, []);

    // Memoized helper functions (created only once)
    const matchesGenre = useCallback((movie, genre) => {
        return genre === "All genres" || movie.genre.toLowerCase() === genre.toLowerCase();
    }, []);

    const matchesRating = useCallback((movie, rating) => {
        if (rating === "All ratings") return true;
        if (rating === "Good") return movie.rating >= 8;
        if (rating === "Ok") return movie.rating >= 5 && movie.rating < 8;
        if (rating === "Bad") return movie.rating < 5;
        return false;
    }, []);

    const matchesSearchTerm = useCallback((movie, searchTerm) => {
        return searchTerm === "" || movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    }, []);

    // Memoized filtered movies - only recalculates when dependencies change
    const filteredMovies = useMemo(() => {
        return allMovies.filter(movie => 
            matchesGenre(movie, genre) && 
            matchesRating(movie, rating) && 
            matchesSearchTerm(movie, searchTerm)
        );
    }, [allMovies, genre, rating, searchTerm, matchesGenre, matchesRating, matchesSearchTerm]);

    // Optimized event handlers
    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleGenreChange = useCallback((e) => {
        setGenre(e.target.value);
    }, []);

    const handleRatingChange = useCallback((e) => {
        setRating(e.target.value);
    }, []);
    

    // Show loading state
    if (isLoading) {
        return (
            <div className="loading-container">
                <p>Loading movies...</p>
            </div>
        );
    }

    return (
        <div>
            <input 
                type="text" 
                className="search-input" 
                placeholder="Search movies..." 
                value={searchTerm} 
                onChange={handleSearchChange}
            />
            <div className="filter-bar">
                <div className="filter-slot">
                    <label>Genre:</label>
                    <select className="filter-dropdown" value={genre} onChange={handleGenreChange}>
                        <option>All genres</option>
                        <option>Action</option>
                        <option>Drama</option>
                        <option>Fantasy</option>
                        <option>Horror</option>
                    </select>   
                </div>
                <div className="filter-slot">
                    <label>Rating:</label>
                    <select className="filter-dropdown" value={rating} onChange={handleRatingChange}>
                        <option>All ratings</option>
                        <option>Good</option>
                        <option>Ok</option>
                        <option>Bad</option>
                    </select>  
                </div>
            </div>
            <div className="movies-grid">
                {filteredMovies.length === 0 ? (
                    <p className="no-movies">No movies found matching your criteria.</p>
                ) : (
                    filteredMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} isWatchlisted={watchlist.includes(movie.id)} toggleWatchlist={toggleWatchlist}/>
                    ))
                )}
            </div>
        </div>
    );
}   