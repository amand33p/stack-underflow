import { ButtonGroup, Button } from '@material-ui/core';

const SortAnsBar = ({ isMobile, sortBy, setSortBy }) => {
  const handleSortChange = (e) => {
    setSortBy(e.target.innerText.toUpperCase());
  };

  return (
    <div>
      <ButtonGroup
        color="secondary"
        disableElevation
        size={isMobile ? 'small' : 'medium'}
      >
        <Button
          variant={sortBy === 'VOTES' ? 'contained' : 'outlined'}
          onClick={handleSortChange}
        >
          Votes
        </Button>
        <Button
          variant={sortBy === 'NEWEST' ? 'contained' : 'outlined'}
          onClick={handleSortChange}
        >
          Newest
        </Button>
        <Button
          variant={sortBy === 'OLDEST' ? 'contained' : 'outlined'}
          onClick={handleSortChange}
        >
          Oldest
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default SortAnsBar;
