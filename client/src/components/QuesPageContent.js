import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { VOTE_QUESTION } from '../graphql/mutations';
import { useAuthContext } from '../context/auth';
import { useStateContext } from '../context/state';
import QuesAnsDetails from './QuesAnsDetails';
import AnswerList from './AnswerList';
import AnswerForm from './AnswerForm';

import { Divider } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';

const QuesPageContent = ({ question }) => {
  const {
    id: quesId,
    answers,
    acceptedAnswer,
    upvotedBy,
    downvotedBy,
    title,
    body,
    tags,
  } = question;

  const { user } = useAuthContext();
  const { setEditValues } = useStateContext();
  const history = useHistory();
  const classes = useQuesPageStyles();

  const [submitVote] = useMutation(VOTE_QUESTION, {
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
    },
  });

  const upvoteQues = () => {
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
      variables: { quesId, voteType: 'UPVOTE' },
      optimisticResponse: {
        __typename: 'Mutation',
        voteQuestion: {
          ...question,
          __typename: 'Question',
          upvotedBy: updatedUpvotedArr,
          downvotedBy: updatedDownvotedArr,
          points: updatedPoints,
        },
      },
    });
  };

  const downvoteQues = () => {
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
      variables: { quesId, voteType: 'DOWNVOTE' },
      optimisticResponse: {
        __typename: 'Mutation',
        voteQuestion: {
          ...question,
          __typename: 'Question',
          upvotedBy: updatedUpvotedArr,
          downvotedBy: updatedDownvotedArr,
          points: updatedPoints,
        },
      },
    });
  };

  const editQues = () => {
    setEditValues({ quesId, title, body, tags });
    history.push('/ask');
  };

  const deleteQues = () => {};

  const addQuesComment = ({ commentBody }, reset, closeInput) => {};

  const editQuesComment = (commentId) => {};

  const deleteQuesComment = (commentId) => {};

  return (
    <div className={classes.content}>
      <QuesAnsDetails
        quesAns={question}
        upvoteQuesAns={upvoteQues}
        downvoteQuesAns={downvoteQues}
        editQuesAns={editQues}
        deleteQuesAns={deleteQues}
        addComment={addQuesComment}
        editComment={editQuesComment}
        deleteComment={deleteQuesComment}
      />
      <Divider />
      <AnswerList
        quesId={quesId}
        answers={answers}
        acceptedAnswer={acceptedAnswer}
      />
      <AnswerForm quesId={quesId} tags={tags} />
    </div>
  );
};

export default QuesPageContent;
