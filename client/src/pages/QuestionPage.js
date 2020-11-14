import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { VIEW_QUESTION } from '../graphql/queries';
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
  const { quesId } = useParams();
  const [fetchQuestion, { data, loading }] = useLazyQuery(VIEW_QUESTION);
  const [question, setQuestion] = useState(null);
  const classes = useQuesPageStyles();

  useEffect(() => {
    fetchQuestion({ variables: { quesId } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quesId]);

  useEffect(() => {
    if (data) {
      setQuestion(data.viewQuestion);
    }
  }, [data]);

  console.log(question);

  return (
    <div className={classes.root}>
      <div className={classes.titleWrapper}>
        <Typography variant="h4">This is title</Typography>
      </div>
      {loading && <div>loading...</div>}
      <Grid container direction="row" wrap="nowrap" justify="space-between">
        {!loading && (
          <div className={classes.content}>
            This is title This is titleThis is title
          </div>
        )}
        <RightSidePanel />
      </Grid>
    </div>
  );
};

export default QuestionPage;
