import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_QUESTIONS } from '../graphql/queries';
import SortQuesBar from '../components/SortQuesBar';
import QuesCard from '../components/QuesCard';
import LoadMoreButton from '../components/LoadMoreButton';
import { filterDuplicates } from '../utils/helperFuncs';

import { Typography, Button, Divider, useMediaQuery } from '@material-ui/core';
import { useQuesListStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';

const QuesListPage = () => {
  const [fetchQuestions, { data, loading }] = useLazyQuery(GET_QUESTIONS);
  const [quesData, setQuesData] = useState(null);
  const [sortBy, setSortBy] = useState('HOT');
  const [page, setPage] = useState(1);
  const classes = useQuesListStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const getQues = (sortBy, page, limit) => {
    fetchQuestions({ variables: { sortBy, page, limit } });
  };

  useEffect(() => {
    if (data && page === 1) {
      setQuesData(data.getQuestions);
    }

    if (data && page !== 1) {
      setQuesData((prevState) => ({
        ...data.getQuestions,
        questions: prevState.questions.concat(
          filterDuplicates(prevState.questions, data.getQuestions.questions)
        ),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    getQues(sortBy, 1, 12);
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  const handleLoadPosts = () => {
    getQues(sortBy, page + 1, 12);
    setPage(page + 1);
  };

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
      {loading && page === 1 && <div>loading...</div>}
      {quesData &&
        quesData.questions.map((q) => <QuesCard key={q.id} question={q} />)}
      {quesData && quesData.next && (
        <LoadMoreButton
          loading={page !== 1 && loading}
          handleLoadPosts={handleLoadPosts}
        />
      )}
    </div>
  );
};

export default QuesListPage;
