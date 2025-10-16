import React from 'react';
import "../styles.css";
import MovieCard from "./MovieCard";

export default function Watchlist({movies, watchlist, toggleWatchlist}) {
    return (
        <div>
            <h1 className='title'>
                Your watchlist
            </h1>
            <div className="watchlist">
                {watchlist.map((id) => {
                        const movie = movies.find((movie) => movie.id === id);
                        return (<MovieCard key={id} movie={movie} isWatchlisted={true} toggleWatchlist={toggleWatchlist}></MovieCard>
                );
                    })}
            </div>
        </div>
    );
}