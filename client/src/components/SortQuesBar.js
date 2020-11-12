import { ButtonGroup, Button } from '@material-ui/core';
import { useQuesListStyles } from '../styles/muiStyles';

const SortQuesBar = ({ isMobile, sortBy, setSortBy }) => {
  const classes = useQuesListStyles();

  const handleSortChange = (e) => {
    setSortBy(e.target.innerText.toUpperCase());
  };

  return (
    <div className={classes.btnGroupWrapper}>
      <ButtonGroup
        color="secondary"
        disableElevation
        size={isMobile ? 'small' : 'medium'}
        fullWidth={isMobile}
      >
        <Button
          variant={sortBy === 'HOT' ? 'contained' : 'outlined'}
          onClick={handleSortChange}
        >
          Hot
        </Button>
        <Button
          variant={sortBy === 'VOTES' ? 'contained' : 'outlined'}
          onClick={handleSortChange}
        >
          Votes
        </Button>
        <Button
          variant={sortBy === 'VIEWS' ? 'contained' : 'outlined'}
          onClick={handleSortChange}
        >
          Views
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

export default SortQuesBar;
