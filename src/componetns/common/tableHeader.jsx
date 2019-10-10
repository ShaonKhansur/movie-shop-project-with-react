import React, { Component } from "react";

class TableHeader extends Component {
  render() {
    const { onSort, columns } = this.props;
    return (
      <thead style={{ cursor: "pointer" }}>
        <tr>
          {columns.map(column => (
            <th key={column.path || column.key} onClick={() => onSort(column.path)}>{column.label}</th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
