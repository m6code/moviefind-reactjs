import React from 'react'

function MovieDetail(props) {
    console.log(props.id);
    return (
        <div>
            <h1>{props.id}</h1>
        </div>
    )
}

export default MovieDetail
