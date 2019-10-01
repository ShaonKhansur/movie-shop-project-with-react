import React, { Component } from "react";
import _ from "lodash";

class Pagination extends Component {
  render() {
    const { items, pageSize, currentPage, onPageChange } = this.props;
    const totalItems = items.length;
    const pageCount = Math.ceil(totalItems / pageSize);
    if (pageCount === 1) return null;

    const totalPages = _.range(1, pageCount + 1);

    return (
      <nav>
        <ul className="pagination">
          {totalPages.map(page => (
            <li
              style={{cursor: 'pointer'}}
              key={page}
              className={
                (page === currentPage) ? "page-item active" : "page-item"
              }
            >
              <a onClick={() => onPageChange(page)} className="page-link">
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
