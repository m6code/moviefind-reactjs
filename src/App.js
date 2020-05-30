import React from 'react';
import axios from 'axios'

import './App.css';
import Header from './components/Header';
import SearchResult from './components/SearchResult'

class App extends React.Component {

  state = {
    movies: [],
    totalResults: '',
  }

  inputRef = React.createRef()

  performSearch = (e) => {
    e.preventDefault();
    const sVal = this.inputRef.current.value;
    this.queryApi(sVal)
  }

  queryApi = (searchVal) =>{
    axios.get(`http://www.omdbapi.com/?apikey=c59a4c38&s=${searchVal}`)
      .then((res) => {
        console.log(res)
        this.setState({
          movies: res.data.Search,
          totalResults: res.data.totalResults,
        })
        console.log(this.state.movies);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentDidMount(){
    this.queryApi('Time');
  }


  render() {
    return (
      <div className="bp3-dark">
        <Header
          performSearch={this.performSearch}
          inputRef={this.inputRef} />
        <SearchResult
          movies={this.state.movies}
          totalResults={this.state.totalResults} />
      </div>
    );
  }
}

export default App;
