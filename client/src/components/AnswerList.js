import { useState } from 'react';
import QuesAnsDetails from './QuesAnsDetails';
import SortAnsBar from './SortAnsBar';
import { sortAnswers } from '../utils/helperFuncs';

import { Typography, useMediaQuery, Divider } from '@material-ui/core';
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

  const acceptAns = (ansId) => {};

  const addAnsComment = ({ commentBody }, reset, closeInput, ansId) => {};

  const editAnsComment = (commentId, ansId) => {};

  const deleteAnsComment = (commentId, ansId) => {};

  return (
    <div className={classes.answersWrapper}>
      {answerList.length !== 0 && (
        <div className={classes.answerHeader}>
          <Typography color="secondary" variant="h6">
            {answerList.length} {answerList.length === 1 ? 'Answer' : 'Answers'}
          </Typography>
          <SortAnsBar setAnswerList={setAnswerList} isMobile={isMobile} />
        </div>
      )}
      <div>
        {answerList.map((a) => (
          <div key={a.id} className={classes.answerWrapper}>
            <QuesAnsDetails
              quesAns={a}
              upvoteQuesAns={() => upvoteAns(a.id)}
              downvoteQuesAns={() => downvoteAns(a.id)}
              editQuesAns={() => editAns(a.id)}
              deleteQuesAns={() => deleteAns(a.id)}
              acceptAnswer={() => acceptAns(a.id)}
              addComment={addAnsComment}
              editComment={editAnsComment}
              deleteComment={deleteAnsComment}
              isAnswer={true}
              acceptedAnswer={acceptedAnswer}
            />
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerList;
