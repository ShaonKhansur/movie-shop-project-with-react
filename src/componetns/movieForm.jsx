import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from './../services/fakeGenreService';
import {getMovie, saveMovie} from './../services/fakeMovieService';
class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: []
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({genres});

    const movieId = this.props.match.params.id;
    if(movieId === 'new') return;

    const movie = getMovie(movieId);
    if(!movie) return this.props.history.replace('/not-found');

    this.setState({data: this.mapToviewModel(movie)})
  };

  mapToviewModel(movie) {
    return{
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push('/movies');
  };
  render() {
    const { match, history } = this.props;
    return (
      <div>
        <h1>Movie Form: {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text")}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "text")}
          {this.renderInput("dailyRentalRate", "Rate", "text")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
