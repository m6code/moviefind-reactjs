import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

function MovieDetails(props) {

    // Store in a state (useState hooks)
    const [movie, setMovie] = useState(null)

    // Access the dynamic route parameter passed into the url
    const {id} = useParams();

    useEffect(() => {
        axios.get(`https://www.omdbapi.com/?apikey=c59a4c38&i=${id}&plot=full`)
            .then(res => {
                console.log(res);
                setMovie(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div className={"mt-4r mx-3r"}>
            {movie && !movie.Error &&
                <div className="movie-res-home">
                    <div className='parent-container'>
                        <div className='poster-detail'><img
                            src={movie.Poster}
                            alt='poster'
                            onError={(e) => {
                                e.target.onerror = 'null';
                                e.target.src = process.env.PUBLIC_URL + 'noImage.png'
                            }}
                        />

                        </div>
                        <div className='details'>
                            <p>Title: {movie.Title}</p>
                            <p>Year: {movie.Year}</p>
                            <p>Genre: {movie.Genre}</p>
                            <p>Actors: {movie.Actors}</p>
                            <p>Director: {movie.Director}</p>
                            <p>Runtime: {movie.Runtime}</p>
                            <p>Box Office: {movie.BoxOffice}</p>
                            <p>Country: {movie.Country}</p>
                            <p>Awards: {movie.Awards}</p>
                            <div>
                                Ratings:
                                <p>{movie.Ratings.Value}</p>
                                {movie.Ratings.map((rating, index) => {
                                    return (
                                        <div key={index} className='ratings'>
                                            <p>{rating.Source} : {rating.Value}</p>
                                        </div>
                                    )
                                })}
                            </div>

                            <p>Type: {movie.Type}</p>
                            <p>Plot: {movie.Plot}</p>
                        </div>
                    </div>
                </div>}
        </div>
    )
}


export default MovieDetails;


// const queryMovie = (id) => {
//     axios.get(`https://www.omdbapi.com/?apikey=c59a4c38&i=${id}&plot=full`)
//          .then((res) => {
//         //console.log(res.data);
//              setMovie(res.data);
//          })
//         .catch((err) => console.log(err));
// }
