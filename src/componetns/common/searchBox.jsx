import React from "react";

const SearchBox = ({value, onChange}) => {
  return (
    <input
      className="form-control my-4"
      name="query"
      type="text"
      placeholder="Search Movie..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
