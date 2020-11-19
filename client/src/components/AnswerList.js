import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { VOTE_ANSWER } from '../graphql/mutations';
import QuesAnsDetails from './QuesAnsDetails';
import SortAnsBar from './SortAnsBar';
import { useAuthContext } from '../context/auth';
import { sortAnswers } from '../utils/helperFuncs';

import { Typography, useMediaQuery, Divider } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';

const AnswerList = ({ quesId, answers, acceptedAnswer }) => {
  const { user } = useAuthContext();
  const classes = useQuesPageStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [sortBy, setSortBy] = useState('VOTES');

  const [submitVote] = useMutation(VOTE_ANSWER, {
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
    },
  });

  /*useEffect(() => {
    setAnswerList(sortAnswers('VOTES', answers, acceptedAnswer));
  }, [answers, acceptedAnswer]);*/

  const upvoteAns = (ansId, upvotedBy, downvotedBy, answer) => {
    let updatedUpvotedArr;
    let updatedDownvotedArr;

    if (upvotedBy.includes(user.id)) {
      updatedUpvotedArr = upvotedBy.filter((u) => u !== user.id);
      updatedDownvotedArr = downvotedBy;
    } else {
      updatedUpvotedArr = [...upvotedBy, user.id];
      updatedDownvotedArr = downvotedBy.filter((d) => d !== user.id);
    }
    const updatedPoints = updatedUpvotedArr.length - updatedDownvotedArr.length;

    submitVote({
      variables: { quesId, ansId, voteType: 'UPVOTE' },
      optimisticResponse: {
        __typename: 'Mutation',
        voteAnswer: {
          ...answer,
          __typename: 'Answer',
          upvotedBy: updatedUpvotedArr,
          downvotedBy: updatedDownvotedArr,
          points: updatedPoints,
        },
      },
    });
  };

  const downvoteAns = (ansId, upvotedBy, downvotedBy, answer) => {
    let updatedUpvotedArr;
    let updatedDownvotedArr;

    if (downvotedBy.includes(user.id)) {
      updatedDownvotedArr = downvotedBy.filter((d) => d !== user.id);
      updatedUpvotedArr = upvotedBy;
    } else {
      updatedDownvotedArr = [...downvotedBy, user.id];
      updatedUpvotedArr = upvotedBy.filter((u) => u !== user.id);
    }
    const updatedPoints = updatedUpvotedArr.length - updatedDownvotedArr.length;

    submitVote({
      variables: { quesId, ansId, voteType: 'DOWNVOTE' },
      optimisticResponse: {
        __typename: 'Mutation',
        voteAnswer: {
          ...answer,
          __typename: 'Answer',
          upvotedBy: updatedUpvotedArr,
          downvotedBy: updatedDownvotedArr,
          points: updatedPoints,
        },
      },
    });
  };

  const editAns = (ansId) => {};

  const deleteAns = (ansId) => {};

  const acceptAns = (ansId) => {};

  const addAnsComment = ({ commentBody }, ansId) => {};

  const editAnsComment = (commentId, ansId) => {};

  const deleteAnsComment = (commentId, ansId) => {};

  const answerList = sortAnswers(sortBy, answers, acceptedAnswer);

  return (
    <div className={classes.answersWrapper}>
      {answerList.length !== 0 && (
        <div className={classes.answerHeader}>
          <Typography color="secondary" variant="h6">
            {answerList.length} {answerList.length === 1 ? 'Answer' : 'Answers'}
          </Typography>
          <SortAnsBar
            sortBy={sortBy}
            setSortBy={setSortBy}
            isMobile={isMobile}
          />
        </div>
      )}
      <div>
        {answerList.map((a) => (
          <div key={a.id} className={classes.answerWrapper}>
            <QuesAnsDetails
              quesAns={a}
              upvoteQuesAns={() =>
                upvoteAns(a.id, a.upvotedBy, a.downvotedBy, a)
              }
              downvoteQuesAns={() =>
                downvoteAns(a.id, a.upvotedBy, a.downvotedBy, a)
              }
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
