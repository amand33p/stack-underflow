import QuesAnsDetails from './QuesAnsDetails';
import AnswerList from './AnswerList';
import AnswerForm from './AnswerForm';

import { Divider } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';

const QuesPageContent = ({ question }) => {
  const classes = useQuesPageStyles();

  const { id: quesId, answers, acceptedAnswer, tags } = question;

  const upvoteQues = () => {};

  const downvoteQues = () => {};

  const editQues = () => {};

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
