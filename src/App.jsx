import React, {useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";

import Header from "./components/Header";
import {Home} from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SearchResult from "./pages/SearchResult";
import {Button} from "@blueprintjs/core";


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
                console.log(err);
            })
    }

    useEffect(() => {
        queryApi("Time");
    }, []);


    const queryMore = (pageNo) => {
        axios.get(`https://www.omdbapi.com/?apikey=c59a4c38&s=${state.searchVal}&page=${pageNo}`)
            .then((res) => {
                console.log(res)
                setState({
                    movies: res.data.Search,
                    totalResults: res.data.totalResults,
                    totalPages: Math.floor(res.data.totalResults / 10),
                    searchVal: state.searchVal,
                    pageCounter: pageNo
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const queryFB = (sign) => {
        if (sign === '+') {
            if (state.pageCounter < state.totalPages) {
                queryMore(state.pageCounter + 1);
            }
        } else if (sign === '-') {
            if (state.pageCounter > 1) {
                queryMore(state.pageCounter - 1);
            }
        }
    }

    return (
        <div>
            <Header
                performSearch={performSearch}
                inputRef={inputRef}/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/search/"}
                       element={state.movies &&
                           <SearchResult movies={state.movies} totalResults={state.totalResults}/>}/>
                <Route path={`/movie/:id`} element={<MovieDetails/>}/>
            </Routes>

            <p className={"mx-3r"}> showing page {state.pageCounter} of {state.totalPages}</p>
            <div className='parent-container mx-3r'>
                <Button className='button' intent='primary' text='First' onClick={() => queryMore(1)}/>
                <Button className='button' intent='primary' text='Previous' onClick={() => queryFB('-')}/>
                <Button className='button' intent='primary' text='Next' onClick={() => queryFB('+')}/>
                <Button className='button' intent='primary' text='Last'
                        onClick={() => queryMore(state.totalPages)}/>
            </div>
        </div>
    );
}