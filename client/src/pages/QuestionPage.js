import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { VIEW_QUESTION } from '../graphql/queries';
import { useStateContext } from '../context/state';
import { useAuthContext } from '../context/auth';
import QuesPageContent from '../components/QuesPageContent';
import RightSidePanel from '../components/RightSidePanel';
import AuthFormModal from '../components/AuthFormModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatDateAgo, getErrorMsg } from '../utils/helperFuncs';

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
  const { clearEdit, notify } = useStateContext();
  const { user } = useAuthContext();
  const { quesId } = useParams();
  const [question, setQuestion] = useState(null);
  const classes = useQuesPageStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [fetchQuestion, { data, loading }] = useLazyQuery(VIEW_QUESTION, {
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });

  useEffect(() => {
    fetchQuestion({ variables: { quesId } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quesId]);

  useEffect(() => {
    if (data) {
      setQuestion(data.viewQuestion);
    }
  }, [data]);

  if (loading || !question) {
    return (
      <div style={{ minWidth: '100%', marginTop: '20%' }}>
        <LoadingSpinner size={80} />
      </div>
    );
  }

  const { title, views, createdAt, updatedAt } = question;

  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <div className={classes.titleWrapper}>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            color="secondary"
            style={{ wordWrap: 'anywhere' }}
          >
            {title}
          </Typography>
          {user ? (
            <Button
              variant="contained"
              color="primary"
              size={isMobile ? 'small' : 'medium'}
              component={RouterLink}
              to="/ask"
              onClick={() => clearEdit()}
              style={{ minWidth: '9em' }}
            >
              Ask Question
            </Button>
          ) : (
            <AuthFormModal buttonType="ask" />
          )}
        </div>
        <div className={classes.quesInfo}>
          <Typography variant="caption" style={{ marginRight: 10 }}>
            Asked <strong>{formatDateAgo(createdAt)} ago</strong>
          </Typography>
          {createdAt !== updatedAt && (
            <Typography variant="caption" style={{ marginRight: 10 }}>
              Edited <strong>{formatDateAgo(updatedAt)} ago</strong>
            </Typography>
          )}
          <Typography variant="caption">
            Viewed <strong>{views} times</strong>
          </Typography>
        </div>
      </div>
      <Divider />
      <Grid container direction="row" wrap="nowrap" justify="space-between">
        <QuesPageContent question={question} />
        <RightSidePanel />
      </Grid>
    </div>
  );
};

export default QuestionPage;
