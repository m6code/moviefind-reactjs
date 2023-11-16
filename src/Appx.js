import React from 'react';
import axios from 'axios'

import './App.css';
import Header from './components/Header';
import SearchResult from './pages/SearchResult'
import MovieDetail from './components/MovieDetail'
import {Home} from "./pages/Home"
// import Paginator from './components/Paginator';
import {
    Button,
} from '@blueprintjs/core'
import {Route, Routes} from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";

class Appx extends React.Component {

    state = {
        movies: [],
        totalResults: '',
        movie: {},
        isAMovie: false,
        searchVal: '',
        totalPages: '',
        pageCounter: 1,
    }

    inputRef = React.createRef()

    performSearch = (e) => {
        e.preventDefault();
        const sVal = this.inputRef.current.value;
        this.queryApi(sVal)
    }

    queryApi = (searchVal) => {
        axios.get(`https://www.omdbapi.com/?apikey=c59a4c38&s=${searchVal}`)
            .then((res) => {
                console.log(res)
                this.setState({
                    movies: res.data.Search,
                    totalResults: res.data.totalResults,
                    isAMovie: false,
                    searchVal: searchVal,
                    pageCounter: 1,
                })

                let totalP = 0;
                if (this.state.totalResults % 2 === 0) {
                    totalP = (this.state.totalResults / 10);
                } else {
                    totalP = (this.state.totalResults / 10) + 1;
                }
                this.setState({
                    totalPages: totalP,
                })
                console.log(this.state.totalPages);
                //console.log(this.state.movies);
            })
            .catch((err) => {
                //console.log(err);
            })
    }

    queryFB = (sign) => {
        if (sign === '+') {
            if (this.state.pageCounter < this.state.totalPages) {
                this.setState({
                    pageCounter: this.state.pageCounter + 1,
                })
            }
            this.queryMore(this.state.pageCounter);
        } else if (sign === '-') {
            if (this.state.pageCounter > 1) {
                this.setState({
                    pageCounter: this.state.pageCounter - 1,
                })
            }
            this.queryMore(this.state.pageCounter);
        }
    }

    queryMore = (pageNo) => {

        let totalP = 0
        if (this.state.totalResults % 2 === 0) {
            totalP = (this.state.totalResults / 10);
        } else {
            totalP = (this.state.totalResults / 10) + 1;
        }

        this.setState({
            totalPages: totalP,
        })
        axios.get(`https://www.omdbapi.com/?apikey=c59a4c38&s=${this.state.searchVal}&page=${pageNo}`)
            .then((res) => {
                //console.log(res)
                this.setState({
                    movies: res.data.Search,
                    totalResults: res.data.totalResults,
                    isAMovie: false,
                })
                console.log(this.state.movies);
            })
            .catch((err) => {
                //console.log(err);
            })

        console.log(this.state.totalPages);
    }


    // getTotalPages = () => {
    //   console.log(this.state.totalPages)
    // }

    componentDidMount() {
        this.queryApi('Time');
    }

    render() {
        return (
            <div>
                <Header
                    performSearch={this.performSearch}
                    inputRef={this.inputRef}/>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={`/movie/:id`} element={<MovieDetails />}/>
                </Routes>
            </div>
        );
    }

    // render() {
    //   return (
    //     <div className="bp3-dark">
    //       <Header
    //         performSearch={this.performSearch}
    //         inputRef={this.inputRef} />
    //       {!this.state.isAMovie ?
    //         <SearchResult
    //           movies={this.state.movies}
    //           totalResults={this.state.totalResults}
    //           queryMovie={this.queryMovie} />
    //         :
    //         <MovieDetail movie={this.state.movie} />
    //       }
    //
    //       {/* <Paginator
    //         totalResults={this.state.totalResults}
    //         queryMore={this.queryApi}
    //       /> */}
    //       <p> showing page {this.state.pageCounter} of {this.state.totalPages}</p>
    //       <div className='parent-container'>
    //         <Button className='button' intent='primary' text='First' onClick={() => this.queryMore(1)} />
    //         <Button className='button' intent='primary' text='Previous' onClick={() => this.queryFB('-')}/>
    //         <Button className='button' intent='primary' text='Next' onClick={() => this.queryFB('+')}/>
    //         <Button className='button' intent='primary' text='Last' onClick={() => this.queryMore(this.state.totalPages)} />
    //       </div>
    //
    //     </div>
    //   );
    // }
}

export default Appx;
