import QuesDetails from './QuesDetails';

import { useQuesPageStyles } from '../styles/muiStyles';

const QuestionContent = ({ question }) => {
  const classes = useQuesPageStyles();

  const { id, answers, points, acceptedAnswer } = question;

  return (
    <div className={classes.content}>
      <QuesDetails question={question} />
    </div>
  );
};

export default QuestionContent;
