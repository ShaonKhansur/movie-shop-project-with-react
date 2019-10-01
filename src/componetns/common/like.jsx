import React, { Component } from "react";

class Like extends Component {
  render() {
    const { movie, onLike } = this.props;
    return (
      <i
        style={{cursor: 'pointer'}}
        onClick={() => onLike(movie)}
        className={movie.liked ? "fa fa-heart" : "fa fa-heart-o"}
      ></i>
    );
  }
}

export default Like;
