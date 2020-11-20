import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  VOTE_ANSWER,
  ACCEPT_ANSWER,
  EDIT_ANSWER,
  DELETE_ANSWER,
} from '../graphql/mutations';
import { VIEW_QUESTION } from '../graphql/queries';
import QuesAnsDetails from './QuesAnsDetails';
import SortAnsBar from './SortAnsBar';
import { useAuthContext } from '../context/auth';
import sortAnswers from '../utils/sortAnswers';
import { upvote, downvote } from '../utils/voteQuesAns';

import { Typography, useMediaQuery, Divider } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';

const AnswerList = ({ quesId, answers, acceptedAnswer }) => {
  const { user } = useAuthContext();
  const classes = useQuesPageStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [sortBy, setSortBy] = useState('VOTES');

  const [updateAnswer] = useMutation(EDIT_ANSWER, {
    update: (_, { data }) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
    },
  });

  const [removeAnswer] = useMutation(DELETE_ANSWER, {
    update: (proxy, { data }) => {
      const dataInCache = proxy.readQuery({
        query: VIEW_QUESTION,
        variables: { quesId },
      });

      const filteredAnswers = dataInCache.viewQuestion.answers.filter(
        (c) => c.id !== data.deleteAnswer
      );

      const updatedData = {
        ...dataInCache.viewQuestion,
        answers: filteredAnswers,
      };

      proxy.writeQuery({
        query: VIEW_QUESTION,
        variables: { quesId },
        data: { viewQuestion: updatedData },
      });
    },
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
    },
  });

  const [submitVote] = useMutation(VOTE_ANSWER, {
    update: (_, { data }) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
    },
  });

  const [submitAcceptAns] = useMutation(ACCEPT_ANSWER, {
    update: (_, { data }) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
    },
  });

  const upvoteAns = (ansId, upvotedBy, downvotedBy) => {
    const { updatedUpvotedArr, updatedDownvotedArr, updatedPoints } = upvote(
      upvotedBy,
      downvotedBy,
      user
    );

    submitVote({
      variables: { quesId, ansId, voteType: 'UPVOTE' },
      optimisticResponse: {
        voteAnswer: {
          __typename: 'Answer',
          id: ansId,
          upvotedBy: updatedUpvotedArr,
          downvotedBy: updatedDownvotedArr,
          points: updatedPoints,
        },
      },
    });
  };

  const downvoteAns = (ansId, upvotedBy, downvotedBy) => {
    const { updatedUpvotedArr, updatedDownvotedArr, updatedPoints } = downvote(
      upvotedBy,
      downvotedBy,
      user
    );

    submitVote({
      variables: { quesId, ansId, voteType: 'DOWNVOTE' },
      optimisticResponse: {
        voteAnswer: {
          __typename: 'Answer',
          id: ansId,
          upvotedBy: updatedUpvotedArr,
          downvotedBy: updatedDownvotedArr,
          points: updatedPoints,
        },
      },
    });
  };

  const editAns = (editedAnswerBody, ansId) => {
    updateAnswer({ variables: { quesId, ansId, body: editedAnswerBody } });
  };

  const deleteAns = (ansId) => {
    removeAnswer({ variables: { quesId, ansId } });
  };

  const acceptAns = (ansId) => {
    submitAcceptAns({
      variables: { quesId, ansId },
      optimisticResponse: {
        acceptAnswer: {
          id: quesId,
          acceptedAnswer: acceptedAnswer === ansId ? null : ansId,
          __typename: 'Question',
        },
      },
    });
  };

  const addAnsComment = (commentBody, ansId) => {};

  const editAnsComment = (editedCommentBody, commentId, ansId) => {};

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
              upvoteQuesAns={() => upvoteAns(a.id, a.upvotedBy, a.downvotedBy)}
              downvoteQuesAns={() =>
                downvoteAns(a.id, a.upvotedBy, a.downvotedBy)
              }
              editQuesAns={editAns}
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
