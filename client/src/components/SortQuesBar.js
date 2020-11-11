import { ButtonGroup, Button } from '@material-ui/core';
import { useQuesListStyles } from '../styles/muiStyles';

const SortQuesBar = ({ isMobile }) => {
  const classes = useQuesListStyles();

  return (
    <div className={classes.btnGroupWrapper}>
      <ButtonGroup
        color="secondary"
        disableElevation
        size={isMobile ? 'small' : 'medium'}
        fullWidth={isMobile}
      >
        <Button variant={'contained'}>Hot</Button>
        <Button>Votes</Button>
        <Button>Views</Button>
        <Button>Newest</Button>
        <Button>Oldest</Button>
      </ButtonGroup>
    </div>
  );
};

export default SortQuesBar;
