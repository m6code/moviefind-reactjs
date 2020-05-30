import React from 'react'

import PropTypes from 'prop-types'

function SearchResult(props) {

    return (

        <div className="movie-res-home">
            <p className='res-no'> Found {props.totalResults} movies for your search</p>
            <div className='movie-list'>
                {props.movies.map((movie) => {
                    return (
                        <div key={movie.imdbID}>
                            <div className='movie'>
                                <img src={movie.Poster} alt={`${movie.Title} poster`} className='poster' />
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
}

export default SearchResult;
