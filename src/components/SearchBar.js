import React from 'react'
import '../styles/SearchBar.css';

function SearchBar({ setSearchText, searchText }) {
  return (

    <input
      className='search-box'
      type="text"
      placeholder="Search by name, email or role"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}

    />
  )
}

export default SearchBar