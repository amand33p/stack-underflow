import QuesAnsDetails from './QuesAnsDetails';

import { useQuesPageStyles } from '../styles/muiStyles';

const QuesPageContent = ({ question }) => {
  const classes = useQuesPageStyles();

  const { id: quesId, answers, points, acceptedAnswer } = question;

  const handleUpvoteQues = () => {};

  const handleDownvoteQues = () => {};

  const handleEditQues = () => {};

  const handleDeleteQues = () => {};

  return (
    <div className={classes.content}>
      <QuesAnsDetails
        quesAns={question}
        handleUpvote={handleUpvoteQues}
        handleDownvote={handleDownvoteQues}
        handleEditQues={handleEditQues}
        handleDeleteQues={handleDeleteQues}
      />
    </div>
  );
};

export default QuesPageContent;
