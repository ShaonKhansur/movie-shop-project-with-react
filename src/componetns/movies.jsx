import React, { Component } from "react";
import http from "./../services/httpServices";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "./../services/movieServices";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/ListGroup";
import { getGenres } from "./../services/genreServices";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: "All Movies" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("The movie has been allready deleted");

        this.setState({movies: originalMovies});
      }
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleSelectGenre = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
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

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      searchQuery,
      selectedGenre,
      sortColumn
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, pageSize, currentPage);
    return { movies, filtered };
  };

  render() {
    const {
      movies: allMovies,
      genres,
      pageSize,
      currentPage,
      searchQuery,
      sortColumn
    } = this.state;
    if (allMovies.length === 0) return <p>There is no movie in Database</p>;

    const { movies, filtered } = this.getPageData();

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
            <Link to="/movies/new" className="btn btn-primary">
              New Movie
            </Link>
            <p>Showing {filtered.length} movies in Database</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
