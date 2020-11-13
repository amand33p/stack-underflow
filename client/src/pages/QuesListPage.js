import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_QUESTIONS } from '../graphql/queries';
import SortQuesBar from '../components/SortQuesBar';
import QuesCard from '../components/QuesCard';

import { Typography, Button, Divider, useMediaQuery } from '@material-ui/core';
import { useQuesListStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';

const QuesListPage = () => {
  const [fetchQuestions, result] = useLazyQuery(GET_QUESTIONS);
  const [quesData, setQuesData] = useState(null);
  const [sortBy, setSortBy] = useState('HOT');
  const [page, setPage] = useState(1);
  const classes = useQuesListStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const getQues = (sortBy, page, limit, filterByTag) => {
    fetchQuestions({ variables: { sortBy, page, limit, filterByTag } });
  };

  useEffect(() => {
    getQues(sortBy, page, 15);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  useEffect(() => {
    if (result.data) {
      setQuesData(result.data.getQuestions);
    }
  }, [result]);

  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <Typography variant={isMobile ? 'h6' : 'h5'}>All Questions</Typography>
        <Button
          variant="contained"
          color="primary"
          size={isMobile ? 'small' : 'medium'}
        >
          Ask Question
        </Button>
      </div>
      <SortQuesBar isMobile={isMobile} sortBy={sortBy} setSortBy={setSortBy} />
      <Divider />
      {quesData &&
        quesData.questions.map((q) => <QuesCard key={q.id} question={q} />)}
    </div>
  );
};

export default QuesListPage;
