import { Link as RouterLink } from 'react-router-dom';
import PostedByUser from './PostedByUser';

import { Paper, Typography, Chip } from '@material-ui/core';
import { useQuesCardStyles } from '../styles/muiStyles';

const QuesCard = ({ question }) => {
  const classes = useQuesCardStyles();

  const {
    id,
    title,
    author,
    body,
    tags,
    points,
    views,
    answerCount,
    createdAt,
  } = question;

  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.infoWrapper}>
        <div className={classes.innerInfo}>
          <Typography variant="body2" className={classes.mainText}>
            {points}
          </Typography>
          <Typography variant="caption">votes</Typography>
        </div>
        <div className={classes.innerInfo}>
          <Typography variant="body2" className={classes.mainText}>
            {answerCount}
          </Typography>
          <Typography variant="caption">answers</Typography>
        </div>
        <Typography variant="caption" noWrap>
          {views} views
        </Typography>
      </div>
      <div className={classes.quesDetails}>
        <Typography
          variant="body2"
          color="secondary"
          className={classes.title}
          component={RouterLink}
          to={`/questions/${id}`}
        >
          {title}
        </Typography>
        <Typography variant="body2" style={{ wordWrap: 'anywhere' }}>
          {body.length > 150 ? body.slice(0, 150) + '...' : body}
        </Typography>
        <div className={classes.bottomWrapper}>
          <div className={classes.tagsWrapper}>
            {tags.map((t) => (
              <Chip
                key={t}
                label={t}
                variant="outlined"
                color="primary"
                size="small"
                component={RouterLink}
                to={`/tags/${t}`}
                className={classes.tag}
                clickable
              />
            ))}
          </div>
          <PostedByUser
            username={author.username}
            userId={author.id}
            createdAt={createdAt}
          />
        </div>
      </div>
    </Paper>
  );
};

export default QuesCard;
