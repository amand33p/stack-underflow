import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { InputAdornment, IconButton, TextField } from '@material-ui/core';
import { useNavStyles } from '../styles/muiStyles';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const SearchBar = ({ isMobile, setSearchOpen }) => {
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();
  const classes = useNavStyles();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput === '') return;
    history.push(`/search/${searchInput}`);
  };

  const clearSearch = () => {
    if (isMobile) {
      setSearchOpen(false);
    }
    setSearchInput('');
  };

  return (
    <div className={classes.searchBar}>
      <form onSubmit={handleSearch}>
        <TextField
          type="search"
          size="small"
          placeholder="Search for questions…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: (searchInput || isMobile) && (
              <InputAdornment position="end">
                <IconButton color="primary" size="small" onClick={clearSearch}>
                  <ArrowBackIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
