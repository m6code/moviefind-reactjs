import React from 'react'

import PropTypes from 'prop-types'

function SearchResult(props) {

    const handleClick = (id) => {
        //alert(`clicked on movie with id=${id} now make this lauch a new page( MovieDetail ) that makes it own query to the api and list movies, it should manage it's own state for now`)
        props.queryMovie(id) // send the id to the Parent component for querying
    }

    return (

        <div className="movie-res-home">
            <p className='res-no'> Found {props.totalResults} movies for your search</p>
            <div className='movie-list'>
                {props.movies.map((movie) => {
                    return (
                        <div key={movie.imdbID}>
                            <div className='movie'>
                                <a href="#"><img src={movie.Poster} alt={`${movie.Title} poster`} onClick={() => handleClick(movie.imdbID)} /></a>
                                <div><a href="#" onClick={() => handleClick(movie.imdbID)} >{movie.Title} <span>({movie.Year})</span></a></div>
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
    totalResults: PropTypes.string.isRequired,
    queryMovie: PropTypes.func.isRequired,
}

export default SearchResult;
