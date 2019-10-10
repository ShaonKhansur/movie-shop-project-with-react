import React, { Component } from "react";
import { getMovies } from "./../services/fakeMovieService";
import Like from "./common/like";
import ListGroup from "./common/ListGroup";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from './../utils/paginate';
import _ from 'lodash';
import TableHeader from "./common/tableHeader";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: {path: 'title', order: 'asc'}
  };

  componentDidMount() {
    const genres = [{name: 'All Movies'}, ...getGenres()]
    const movies = getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleSelectGenre = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handlePageChange = page => {
    this.setState({currentPage: page});
  };

  handleSort = path => {
    const sortColumn = this.state.sortColumn;
    if(sortColumn.path === path) 
      sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc'
    } 
    this.setState({sortColumn})
  }

  render() {
    const columns = [
      {path: 'title', label: 'Title'},
      {path: 'genre.name', label: 'Genre'},
      {path: 'numberInStock', label: 'Stock'},
      {path: 'dailyRentalRate', label: 'Rate'},
      {key:'like'},
      {key:'delete'}
    ];

    const { movies: allMovies, genres, pageSize, currentPage, selectedGenre, sortColumn } = this.state;
    if (allMovies.length === 0) return <p>There is no movie in Database</p>;

    const filtered = (selectedGenre && selectedGenre._id) ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, pageSize, currentPage);
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              genres={genres}
              selectedGenre={this.state.selectedGenre}
              onSelectGenre={this.handleSelectGenre}
            />
          </div>
          <div className="col">
            <p>Showing {filtered.length} movies in Database</p>
            <table className="table">
             <TableHeader columns={columns} onSort={this.handleSort}/>
              <tbody>
                {movies.map(movie => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like movie={movie} onLike={this.handleLike} />
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(movie)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              onPageChange={this.handlePageChange}
              items={filtered}
              pageSize={pageSize}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;