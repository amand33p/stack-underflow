import { Link as RouterLink } from 'react-router-dom';
import { formatDateAgo } from '../utils/helperFuncs';

import { Typography } from '@material-ui/core';
import { useUserPageStyles } from '../styles/muiStyles';

const RecentQuestions = ({ question }) => {
  const classes = useUserPageStyles();

  return (
    <div className={classes.recentQuesAns}>
      <div className={classes.votesTitleWrapper}>
        <div className={classes.votes}>
          <Typography color="primary" variant="subtitle2">
            {question.points}
          </Typography>
        </div>
        <Typography
          variant="subtitle2"
          color="secondary"
          className={classes.title}
          component={RouterLink}
          to={`/questions/${question.id}`}
        >
          {question.title}
        </Typography>
      </div>
      <Typography variant="caption" className={classes.timeAgo}>
        {formatDateAgo(question.createdAt)} ago
      </Typography>
    </div>
  );
};

export default RecentQuestions;
