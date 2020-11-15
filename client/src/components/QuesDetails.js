import { Link as RouterLink } from 'react-router-dom';
import { UpvoteButton, DownvoteButton } from './VoteButtons';
import { useAuthContext } from '../context/auth';
import PostedByUser from './PostedByUser';

import { Typography, Chip, Button, Divider } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

const QuesDetails = ({ question }) => {
  const { user } = useAuthContext();
  const classes = useQuesPageStyles();

  const {
    id,
    author,
    body,
    tags,
    comments,
    points,
    upvotedBy,
    downvotedBy,
    createdAt,
    updatedAt,
  } = question;

  const handleUpvote = () => {};

  const handleDownvote = () => {};

  return (
    <div className={classes.quesWrapper}>
      <div className={classes.voteColumn}>
        <UpvoteButton
          user={user}
          upvotedBy={upvotedBy}
          handleUpvote={handleUpvote}
        />
        <Typography variant="h6" color="secondary">
          {points}
        </Typography>
        <DownvoteButton
          user={user}
          downvotedBy={downvotedBy}
          handleDownvote={handleDownvote}
        />
      </div>
      <div className={classes.quesBody}>
        <Typography variant="body1">{body}</Typography>
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
        <div className={classes.bottomWrapper}>
          <div className={classes.btnsWrapper}>
            {user && user.id === author.id && (
              <Button
                size="small"
                color="secondary"
                startIcon={<EditTwoToneIcon />}
                style={{ marginRight: 9 }}
                className={classes.bottomBtns}
              >
                Edit
              </Button>
            )}
            {user && (user.id === author.id || user.role === 'admin') && (
              <Button
                size="small"
                color="secondary"
                startIcon={<DeleteTwoToneIcon />}
                className={classes.bottomBtns}
              >
                Delete
              </Button>
            )}
          </div>
          <PostedByUser
            username={author.username}
            userId={author.id}
            createdAt={createdAt}
            filledVariant={true}
          />
        </div>
        <Divider />
      </div>
    </div>
  );
};

export default QuesDetails;
