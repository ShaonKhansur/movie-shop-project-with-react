import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const { genres, onSelectGenre, selectedGenre } = this.props;
    return (
      <ul className="list-group">
        {genres.map(genre => (
          <li
            key={genre._id || genre.name}
            style={{cursor: 'pointer'}}
            onClick={() => onSelectGenre(genre)}
            className={(genre === selectedGenre) ? "list-group-item active" : "list-group-item"}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;
