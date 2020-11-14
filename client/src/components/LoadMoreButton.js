import { Button, CircularProgress } from '@material-ui/core';
import { useQuesListStyles } from '../styles/muiStyles';
import AutorenewIcon from '@material-ui/icons/Autorenew';

const LoadMoreButton = ({ handleLoadPosts, loading }) => {
  const classes = useQuesListStyles();

  return (
    <div className={classes.loadBtnWrapper}>
      <Button
        color="primary"
        variant="outlined"
        size="large"
        onClick={handleLoadPosts}
        startIcon={!loading && <AutorenewIcon />}
        className={classes.loadBtn}
        disabled={loading}
      >
        {loading && (
          <CircularProgress
            disableShrink
            size={22}
            style={{ marginRight: '1em' }}
          />
        )}
        {loading ? 'Loading...' : 'Load More'}
      </Button>
    </div>
  );
};

export default LoadMoreButton;
