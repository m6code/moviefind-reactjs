import React from 'react'

import PropTypes from 'prop-types'
import MovieDetail from './MovieDetail'

function SearchResult(props) {

    const handleClick = (id) => {
        alert(`clicked on movie with id=${id} now make this lauch a new page( MovieDetail ) that makes it own query to the api and list movies, it should manage it's own state for now`)
        return(
        <MovieDetail
            id={id}
            queryMovie={props.queryMovie(id)}
        />
        )
    }

    return (

        <div className="movie-res-home">
            <p className='res-no'> Found {props.totalResults} movies for your search</p>
            <div className='movie-list'>
                {props.movies.map((movie) => {
                    return (
                        <div key={movie.imdbID}>
                            <div className='movie'>
                                <img src={movie.Poster} alt={`${movie.Title} poster`} className='poster' onClick={() => handleClick(movie.imdbID)} />
                                <div>{movie.Title} <span>({movie.Year})</span></div>
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
