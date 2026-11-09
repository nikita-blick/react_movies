import "./Main.css";
import React from "react"
import Preloader from "../components/Preloader";
import MovieList from "../components/MovieList";
import Search from "../components/Search.js";


class Main extends React.Component
{
    state =
        {
            movies: [],
            count:0
        }

    componentDidMount()
    {
        fetch('https://www.omdbapi.com/?s=Terminator&apikey=ecb321b9')
            .then(response => response.json())
            .then(data => this.setState({movies:data.Search}));
    }
    searchMovie = (str, type = 'all', page=1) =>
    {
        fetch
        (
            `https://www.omdbapi.com/?s=${str}&${type !== 'all' ? `&type=${type}` : ''}$page=${page}&apikey=ecb321b9`
        )
            .then(response => response.json())
            .then(data => this.setState({ movies: data.Search, count:data.totalResults }));
            //.then(data => this.setState({ movies: data.Search }));
    }

    render()
    {
        return (
            <div className="main">
                <Search searchMovie={this.searchMovie} totalCount={ this.state.count } />
                {
                    this.state.movies == null ? <h1>Nothing</h1> :
                    this.state.movies.length == 0 ? <Preloader /> :
                    <MovieList movies={this.state.movies} />
                }
            </div>
        )
    
    }
}
export default Main;