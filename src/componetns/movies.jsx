import React, { Component } from "react";
import { getMovies } from "./../services/fakeMovieService";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/ListGroup";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import {Link} from 'react-router-dom';
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ name: "All Movies" }, ...getGenres()];
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
    this.setState({ currentPage: page });
  };

  handleSort = path => {
    const sortColumn = this.state.sortColumn;
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      movies: allMovies,
      genres,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, pageSize, currentPage);
    return { movies, filtered};
  }

  render() {
    const {
      movies: allMovies,
      genres,
      pageSize,
      currentPage,
      sortColumn
    } = this.state;
    if (allMovies.length === 0) return <p>There is no movie in Database</p>;

    const {movies, filtered} = this.getPageData();

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
            <Link to="/movie/new" className="btn btn-primary">New Movie</Link>
            <p>Showing {filtered.length} movies in Database</p>
            <MoviesTable
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              data={movies}
            />

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
