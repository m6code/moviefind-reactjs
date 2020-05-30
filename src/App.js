import React from 'react';
import axios from 'axios'

import './App.css';
import Header from './components/Header';

class App extends React.Component {

  state = {
    movies: [],
    totalResults: '',
  }

  inputRef = React.createRef()

  performSearch = (param) => {
    param.preventDefault();
    const sVal = this.inputRef.current.value;
    axios.get(`http://www.omdbapi.com/?apikey=c59a4c38&s=${sVal}`)
      .then((res) => {
        console.log(res)
        this.setState({
          movies: res.data.Search,
          totalResults: res.data.TotalResults,
        })
        console.log(this.state.movies);
      })
      .catch((err) => {
        console.log(err);
      })
  }


  render() {
    return (
      <div className="bp3-dark">
        <Header
          performSearch={this.performSearch}
          inputRef={this.inputRef} />
        <p>Search Results</p>
      </div>
    );
  }
}

export default App;
