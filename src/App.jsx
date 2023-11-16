import React, {useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";

import Header from "./components/Header";
import {Home} from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SearchResult from "./pages/SearchResult";


export function App() {
    const [state, setState] = useState({
        movies: [],
        searchVal: '',
        totalResults: 0,
        totalPages: 0,
        pageCounter: 1,
    });
    const inputRef = React.createRef()

    const performSearch = (e) => {
        e.preventDefault();
        const sVal = inputRef.current.value;
        queryApi(sVal)
    }

    const queryApi = (searchVal) => {
        axios.get(`https://www.omdbapi.com/?apikey=c59a4c38&s=${searchVal}`)
            .then((res) => {
                console.log(res)
                setState({
                    movies: res.data.Search,
                    totalResults: res.data.totalResults,
                    totalPages: Math.floor(res.data.totalResults / 10),
                    searchVal: searchVal,
                    pageCounter: 1
                })

            })
            .catch((err) => {
                //console.log(err);
            })
    }

    useEffect(() => {
        queryApi("Time");
    }, []);

    return (
        <div>
            <Header
                performSearch={performSearch}
                inputRef={inputRef}/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/search/"}
                       element={<SearchResult movies={state.movies} totalResults={state.totalResults}/>}/>
                <Route path={`/movie/:id`} element={<MovieDetails/>}/>
            </Routes>
        </div>
    );
}