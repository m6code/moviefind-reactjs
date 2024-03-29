import React from 'react'

import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

function SearchResult(props) {

    const handleClick = (id) => {
        //alert(`clicked on movie with id=${id} now make this lauch a new page( MovieDetail ) that makes it own query to the api and list movies, it should manage it's own state for now`)
        props.queryMovie(id) // send the id to the Parent component for querying
    }

    const defImage = process.env.PUBLIC_URL ;
    console.log(defImage);


    return (
        <div className="movie-res-home">
            <p className='res-no'> Found {props.totalResults} movies for your search</p>
            <div className='movie-list'>
                {props.movies.map((movie, index) => {
                    return (
                        <div key={index}>
                            <div className='movie'>
                                <Link to={`/movie/${movie.imdbID}`}>
                                    <img src={movie.Poster}
                                        onError={(e) => {e.target.onerror = 'null'; e.target.src=process.env.PUBLIC_URL + 'noImage.png'}} 
                                        alt={`${movie.Title} poster`} />
                                </Link>
                                {/*<div><a href="#" onClick={() => handleClick(movie.imdbID)} >{movie.Title}</a> <span>({movie.Year})</span></div>*/}
                                <div><Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link> <span>({movie.Year})</span></div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* <div className='homepageImg'>
                <img src='https://via.placeholder.com/250' alt='movie poster' />
            </div>
            <div>Title <span>(year)</span></div> */}
        </div>
    )
}

SearchResult.propTypes = {
    movies: PropTypes.array.isRequired,
    totalResults: PropTypes.number.isRequired,
}

export default SearchResult;
