import RightSidePanel from '../components/RightSidePanel';

import {
  Typography,
  Button,
  Divider,
  Grid,
  useMediaQuery,
} from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';

const QuestionPage = () => {
  const classes = useQuesPageStyles();

  return (
    <div className={classes.root}>
      <div className={classes.titleWrapper}>
        <Typography variant="h4">This is title</Typography>
      </div>
      <Grid container direction="row" wrap="nowrap">
        <div className={classes.content}>
          This is title This is titleThis is title
        </div>
        <RightSidePanel />
      </Grid>
    </div>
  );
};

export default QuestionPage;
