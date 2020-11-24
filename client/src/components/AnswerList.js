import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  VOTE_ANSWER,
  ACCEPT_ANSWER,
  EDIT_ANSWER,
  DELETE_ANSWER,
  ADD_ANS_COMMENT,
  EDIT_ANS_COMMENT,
  DELETE_ANS_COMMENT,
} from '../graphql/mutations';
import { VIEW_QUESTION } from '../graphql/queries';
import QuesAnsDetails from './QuesAnsDetails';
import SortAnsBar from './SortAnsBar';
import { useAuthContext } from '../context/auth';
import { useStateContext } from '../context/state';
import sortAnswers from '../utils/sortAnswers';
import { upvote, downvote } from '../utils/voteQuesAns';
import { getErrorMsg } from '../utils/helperFuncs';

import { Typography, useMediaQuery, Divider } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';

const AnswerList = ({ quesId, answers, acceptedAnswer, quesAuthor }) => {
  const { user } = useAuthContext();
  const { notify } = useStateContext();
  const classes = useQuesPageStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [sortBy, setSortBy] = useState('VOTES');

  const [updateAnswer] = useMutation(EDIT_ANSWER, {
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });

  const [removeAnswer] = useMutation(DELETE_ANSWER, {
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });

  const [submitVote] = useMutation(VOTE_ANSWER, {
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });
  const [submitAcceptAns] = useMutation(ACCEPT_ANSWER, {
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });
  const [postAnsComment] = useMutation(ADD_ANS_COMMENT, {
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });
  const [updateAnsComment] = useMutation(EDIT_ANS_COMMENT, {
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });
  const [removeAnsComment] = useMutation(DELETE_ANS_COMMENT, {
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
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
        __typename: 'Mutation',
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
        __typename: 'Mutation',
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
    updateAnswer({
      variables: { quesId, ansId, body: editedAnswerBody },
      update: () => {
        notify('Answer updated!');
      },
    });
  };

  const deleteAns = (ansId) => {
    removeAnswer({
      variables: { quesId, ansId },
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

        notify('Answer deleted!');
      },
    });
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
      update: (_, { data }) => {
        if (data.acceptAnswer.acceptedAnswer) {
          notify('Accepted the answer!');
        } else {
          notify('Un-accepted the answer.');
        }
      },
    });
  };

  const addAnsComment = (commentBody, ansId) => {
    postAnsComment({
      variables: { quesId, ansId, body: commentBody },
      update: (proxy, { data }) => {
        const dataInCache = proxy.readQuery({
          query: VIEW_QUESTION,
          variables: { quesId },
        });

        const updatedAnswers = dataInCache.viewQuestion.answers.map((a) =>
          a.id === ansId ? { ...a, comments: data.addAnsComment } : a
        );

        const updatedData = {
          ...dataInCache.viewQuestion,
          answers: updatedAnswers,
        };

        proxy.writeQuery({
          query: VIEW_QUESTION,
          variables: { quesId },
          data: { viewQuestion: updatedData },
        });

        notify('Comment added to answer!');
      },
    });
  };

  const editAnsComment = (editedCommentBody, commentId, ansId) => {
    updateAnsComment({
      variables: { quesId, ansId, commentId, body: editedCommentBody },
      update: () => {
        notify('Comment edited!');
      },
    });
  };

  const deleteAnsComment = (commentId, ansId) => {
    removeAnsComment({
      variables: { quesId, ansId, commentId },
      update: (proxy, { data }) => {
        const dataInCache = proxy.readQuery({
          query: VIEW_QUESTION,
          variables: { quesId },
        });

        const targetAnswer = dataInCache.viewQuestion.answers.find(
          (a) => a.id === ansId
        );
        const updatedComments = targetAnswer.comments.filter(
          (c) => c.id !== data.deleteAnsComment
        );

        const updatedAnswers = dataInCache.viewQuestion.answers.map((a) =>
          a.id === ansId ? { ...a, comments: updatedComments } : a
        );

        const updatedData = {
          ...dataInCache.viewQuestion,
          answers: updatedAnswers,
        };

        proxy.writeQuery({
          query: VIEW_QUESTION,
          variables: { quesId },
          data: { viewQuestion: updatedData },
        });

        notify('Comment deleted!');
      },
    });
  };

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
              quesAuthor={quesAuthor}
            />
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerList;
