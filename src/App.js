import React from 'react';
import axios from 'axios'

import './App.css';
import Header from './components/Header';
import SearchResult from './components/SearchResult'
import MovieDetail from './components/MovieDetail'
// import Paginator from './components/Paginator';
import {
  Button,
} from '@blueprintjs/core'

class App extends React.Component {

  state = {
    movies: [],
    totalResults: '',
    movie: {},
    isAMovie: false,
    searchVal: '',
    totalPages: '',
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

  queryMovie = (id) => {
    axios.get(`https://www.omdbapi.com/?apikey=c59a4c38&i=${id}&plot=full`).then((res) => {
      //console.log(res.data);
      this.setState({
        movie: res.data,
        isAMovie: true,
      })
      // console.log(this.state.movie)
      // console.log(this.state.isAMovie)
    })
      .catch((err) => console.log(err));
  }

  // getTotalPages = () => {
  //   console.log(this.state.totalPages)
  // }

  componentDidMount() {
    this.queryApi('Time');
  }


  render() {
    return (
      <div className="bp3-dark">
        <Header
          performSearch={this.performSearch}
          inputRef={this.inputRef} />
        {!this.state.isAMovie ?
          <SearchResult
            movies={this.state.movies}
            totalResults={this.state.totalResults}
            queryMovie={this.queryMovie} />
          :
          <MovieDetail movie={this.state.movie} />
        }

        {/* <Paginator
          totalResults={this.state.totalResults}
          queryMore={this.queryApi}
        /> */}
        <div className='parent-container'>
          <Button className='button' intent='primary' text='First' onClick={() => this.queryMore(1)} />
          <Button className='button' intent='primary' text='Previous' />
          <Button className='button' intent='primary' text='Next' />
          <Button className='button' intent='primary' text='Last' onClick={() => this.queryMore(this.state.totalPages)} />
        </div>

      </div>
    );
  }
}

export default App;
