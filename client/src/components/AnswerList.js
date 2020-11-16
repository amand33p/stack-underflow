import { useState } from 'react';
import QuesAnsDetails from './QuesAnsDetails';
import SortAnsBar from './SortAnsBar';
import { sortAnswers } from '../utils/helperFuncs';

import { Typography, useMediaQuery } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';

const AnswerList = ({ quesId, answers, acceptedAnswer }) => {
  const [answerList, setAnswerList] = useState(sortAnswers(answers, 'VOTES'));
  const classes = useQuesPageStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const upvoteAns = (ansId) => {};

  const downvoteAns = (ansId) => {};

  const editAns = (ansId) => {};

  const deleteAns = (ansId) => {};

  /*const addAnsComment = ({ commentBody }, reset, closeInput) => {};

  const editAnsComment = (commentId) => {};

  const deleteAnsComment = (commentId) => {};*/

  return (
    <div className={classes.answersWrapper}>
      <div className={classes.answerHeader}>
        <Typography color="secondary" variant="h6">
          Answers
        </Typography>
        <SortAnsBar isMobile={isMobile} setAnswerList={setAnswerList} />
      </div>
      <div>
        {answerList.map((a) => (
          <QuesAnsDetails
            key={a.id}
            quesAns={a}
            upvoteQuesAns={() => upvoteAns(a.id)}
            downvoteQuesAns={() => downvoteAns(a.id)}
            editQuesAns={() => editAns(a.id)}
            deleteQuesAns={() => deleteAns(a.id)}
            isAnswer={true}
          />
        ))}
      </div>
    </div>
  );
};

export default AnswerList;
