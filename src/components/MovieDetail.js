import React from 'react'
import PropTypes from 'prop-types'

function MovieDetail(props) {
    console.log(props.movie);
    return (
        <div className="movie-res-home">
            <div className='parent-container'>
                <div className='poster-detail'><img
                    src={props.movie.Poster}
                    alt='poster'
                    onError={(e) => {e.target.onerror='null'; e.target.src=process.env.PUBLIC_URL + 'noImage.png'}}
                    />

                </div>
                <div className='details'>
                    <p>Title: {props.movie.Title}</p>
                    <p>Year: {props.movie.Year}</p>
                    <p>Genre: {props.movie.Genre}</p>
                    <p>Actors: {props.movie.Actors}</p>
                    <p>Director: {props.movie.Director}</p>
                    <p>Runtime: {props.movie.Runtime}</p>
                    <p>Box Office: {props.movie.BoxOffice}</p>
                    <p>Country: {props.movie.Country}</p>
                    <p>Awards: {props.movie.Awards}</p>
                    <div>
                        Ratings:
                        <p>{props.movie.Ratings.Value}</p>
                        {props.movie.Ratings.map((rating, index) => {
                            return (
                                <div key={index} className='ratings'>
                                    <p>{rating.Source} : {rating.Value}</p>
                                </div>
                            )
                        })}
                    </div>

                    <p>Type: {props.movie.Type}</p>
                    <p>Plot: {props.movie.Plot}</p>
                </div>
            </div>
        </div>
    )
}

MovieDetail.propTypes = {
    movie: PropTypes.object.isRequired,
}

export default MovieDetail
