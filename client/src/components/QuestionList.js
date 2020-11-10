import { useQuesListStyles } from '../styles/muiStyles';

const QuestionList = () => {
  const classes = useQuesListStyles();

  return <div className={classes.root}></div>;
};

export default QuestionList;
