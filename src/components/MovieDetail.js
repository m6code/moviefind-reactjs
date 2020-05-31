import React from 'react'
import PropTypes from 'prop-types'

function MovieDetail(props) {
    console.log(props.movie);
    return (
        <div className="movie-res-home">
            <h1>{props.movie.Title}</h1>
        </div>
    )
}

MovieDetail.propTypes = {
    movie: PropTypes.object.isRequired,
}

export default MovieDetail
