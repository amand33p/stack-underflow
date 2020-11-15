import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { VIEW_QUESTION } from '../graphql/queries';
import QuestionContent from '../components/QuestionContent';
import RightSidePanel from '../components/RightSidePanel';
import { formatDateAgo } from '../utils/helperFuncs';

import {
  Typography,
  Button,
  Divider,
  Grid,
  useMediaQuery,
} from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';

const QuestionPage = () => {
  const { quesId } = useParams();
  const [fetchQuestion, { data }] = useLazyQuery(VIEW_QUESTION);
  const [question, setQuestion] = useState(null);
  const classes = useQuesPageStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    fetchQuestion({ variables: { quesId } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quesId]);

  useEffect(() => {
    if (data) {
      setQuestion(data.viewQuestion);
    }
  }, [data]);

  if (!question) {
    return <div>loading...</div>;
  }

  const { title, views, createdAt } = question;

  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <div className={classes.titleWrapper}>
          <Typography variant={isMobile ? 'h6' : 'h5'} color="secondary">
            {title}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size={isMobile ? 'small' : 'medium'}
          >
            Ask Question
          </Button>
        </div>
        <div className={classes.quesInfo}>
          <Typography variant="body2" style={{ marginRight: 12 }}>
            Asked <strong>{formatDateAgo(createdAt)} ago</strong>
          </Typography>
          <Typography variant="body2">
            Viewed <strong>{views} times</strong>
          </Typography>
        </div>
      </div>
      <Divider />
      <Grid container direction="row" wrap="nowrap" justify="space-between">
        <QuestionContent question={question} />
        <RightSidePanel />
      </Grid>
    </div>
  );
};

export default QuestionPage;
