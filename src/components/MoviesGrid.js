import { useState, useEffect } from "react";
import React from "react";
import "../styles.css";

export default function MoviesGrid() {

    const [movies, setMovies] = useState([]);


    useEffect(() => {

        const m = ["a", "b", "c", "d"];
        setMovies(m);

    }, []);

    return (    
        <div>{movies.length}</div>
    );
}   