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
  }

  inputRef = React.createRef()

  performSearch = (e) => {
    e.preventDefault();
    const sVal = this.inputRef.current.value;
    this.queryApi(sVal)
  }

  queryApi = (searchVal, pageNo) => {
    pageNo = 3;
    axios.get(`https://www.omdbapi.com/?apikey=c59a4c38&s=${searchVal}&page=${pageNo}`)
      .then((res) => {
        //console.log(res)
        this.setState({
          movies: res.data.Search,
          totalResults: res.data.totalResults,
          isAMovie: false,
        })
        //console.log(this.state.movies);
      })
      .catch((err) => {
        //console.log(err);
      })
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
        <Button className='button' intent='primary' text='First' />
        <Button className='button' intent='primary' text='Previous' />
        <Button className='button' intent='primary' text='Next' />
        <Button className='button' intent='primary' text='Last' />
        </div>

      </div>
    );
  }
}

export default App;
