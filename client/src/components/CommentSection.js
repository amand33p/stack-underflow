import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { formatDayTime } from '../utils/helperFuncs';

import { Typography, Link, Divider, Button } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';
import EditIcon from '@material-ui/icons/Edit';

const CommentSection = ({ user, comments }) => {
  const [commentArr, setCommentArr] = useState(comments.slice(0, 3));
  const classes = useQuesPageStyles();

  return (
    <div>
      {commentArr.map((c) => (
        <div key={c.id}>
          <div className={classes.comment}>
            <Typography variant="caption">
              {c.body} –{' '}
              <Link component={RouterLink} to={`/user/${c.author.username}`}>
                {c.author.username}
              </Link>
              <Typography variant="caption" color="secondary">
                {` ${formatDayTime(c.createdAt)} `}
              </Typography>
              {c.createdAt !== c.updatedAt && (
                <EditIcon fontSize="inherit" color="secondary" />
              )}
            </Typography>
          </div>
          <Divider />
        </div>
      ))}
      {commentArr.length !== comments.length && (
        <Button
          size="small"
          color="primary"
          onClick={() => setCommentArr(comments)}
        >
          show {comments.length - commentArr.length} more comments
        </Button>
      )}
      {commentArr.length === comments.length && (
        <Button size="small" color="primary">
          add a comment
        </Button>
      )}
    </div>
  );
};

export default CommentSection;
