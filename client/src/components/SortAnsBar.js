import { useState } from 'react';
import { sortAnswers } from '../utils/helperFuncs';

import { ButtonGroup, Button } from '@material-ui/core';

const SortAnsBar = ({ isMobile, setAnswerList, acceptedAnswer }) => {
  const [sortBy, setSortBy] = useState('VOTES');

  const handleSortChange = (e) => {
    setSortBy(e.target.innerText.toUpperCase());
    setAnswerList((prevState) =>
      sortAnswers(e.target.innerText.toUpperCase(), prevState, acceptedAnswer)
    );
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
