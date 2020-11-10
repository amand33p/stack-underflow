import {
  Typography,
  Button,
  ButtonGroup,
  Divider,
  useMediaQuery,
} from '@material-ui/core';
import { useQuesListStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';

const QuestionList = () => {
  const classes = useQuesListStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <Typography variant="h5">All Questions</Typography>
        <Button
          variant="contained"
          color="primary"
          size={isMobile ? 'small' : 'medium'}
        >
          Ask Question
        </Button>
      </div>
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
      <Divider />
    </div>
  );
};

export default QuestionList;
