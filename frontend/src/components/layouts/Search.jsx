import React from 'react';
import { FiSearch } from "react-icons/fi";

const Search = () => {

  return (
    <form>
        <div className="input-group">
            <input 
                type="text" 
                placeholder='Search your favourite Restaurant ...' 
                id="search_field" 
                className="form-control" 
            />
            <div className="input-group-append">
                <button id="search_btn" className="btn">
                    <FiSearch className='fa fa-search'/>
                </button>
            </div>
        </div>
    </form>
  );
};

export default Search;