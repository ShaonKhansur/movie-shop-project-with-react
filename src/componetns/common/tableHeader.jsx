import React, { Component } from "react";

class TableHeader extends Component {

  renderSortIcon = column => {
    const {sortColumn} = this.props;
    if(column.path !== sortColumn.path) return null;
    if(sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>
  };

  render() {
    const { onSort, columns, sortColumn } = this.props;
    return (
      <thead style={{ cursor: "pointer" }}>
        <tr>
          {columns.map(column => (
            <th
              key={column.path || column.key}
              onClick={() => onSort(column.path)}
            >
              {column.label}{this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
