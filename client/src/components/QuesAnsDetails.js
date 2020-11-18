import { Link as RouterLink } from 'react-router-dom';
import { UpvoteButton, DownvoteButton } from './VoteButtons';
import { useAuthContext } from '../context/auth';
import PostedByUser from './PostedByUser';
import CommentSection from './CommentSection';
import AcceptAnswerButton from './AcceptAnswerButton';

import { Typography, Chip, Button } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

const QuesAnsDetails = ({
  quesAns,
  upvoteQuesAns,
  downvoteQuesAns,
  editQuesAns,
  deleteQuesAns,
  addComment,
  editComment,
  deleteComment,
  acceptAnswer,
  isAnswer,
  acceptedAnswer,
}) => {
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
  } = quesAns;

  return (
    <div className={classes.quesAnsWrapper}>
      <div className={classes.voteColumn}>
        <UpvoteButton
          checked={user ? upvotedBy.includes(user.id) : false}
          user={user}
          handleUpvote={upvoteQuesAns}
        />
        <Typography variant="h6" color="secondary">
          {points}
        </Typography>
        <DownvoteButton
          checked={user ? downvotedBy.includes(user.id) : false}
          user={user}
          handleDownvote={downvoteQuesAns}
        />
        {isAnswer && user && user.id === author.id && (
          <AcceptAnswerButton
            checked={acceptedAnswer && acceptedAnswer === id}
            handleAcceptAns={acceptAnswer}
          />
        )}
      </div>
      <div className={classes.quesBody}>
        <Typography variant="body1">{body}</Typography>
        {tags && (
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
        )}
        <div className={classes.bottomWrapper}>
          <div className={classes.btnsWrapper}>
            {user && user.id === author.id && (
              <Button
                size="small"
                color="secondary"
                startIcon={<EditTwoToneIcon />}
                style={{ marginRight: 6 }}
                className={classes.bottomBtns}
                onClick={editQuesAns}
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
                onClick={deleteQuesAns}
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
            isAnswer={isAnswer}
          />
        </div>
        <CommentSection
          user={user}
          comments={comments}
          addComment={addComment}
          editComment={editComment}
          deleteComment={deleteComment}
          quesAnsId={id}
        />
      </div>
    </div>
  );
};

export default QuesAnsDetails;
