import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { UpvoteButton, DownvoteButton } from './VoteButtons';
import { useAuthContext } from '../context/auth';
import PostedByUser from './PostedByUser';
import CommentSection from './CommentSection';
import AcceptAnswerButton from './AcceptAnswerButton';
import DeleteDialog from './DeleteDialog';
import AuthFormModal from './AuthFormModal';
import { ReactComponent as AcceptedIcon } from '../svg/accepted.svg';

import {
  Typography,
  Chip,
  Button,
  SvgIcon,
  TextField,
} from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';

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
  quesAuthor,
}) => {
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
  } = quesAns;

  const classes = useQuesPageStyles();
  const { user } = useAuthContext();
  const [editAnsOpen, setEditAnsOpen] = useState(false);
  const [editedAnswerBody, setEditedAnswerBody] = useState(body);

  useEffect(() => {
    if (isAnswer) {
      setEditedAnswerBody(body);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body]);

  const openEditInput = () => {
    setEditAnsOpen(true);
  };

  const closeEditInput = () => {
    setEditAnsOpen(false);
  };

  const handleAnswerEdit = (e) => {
    e.preventDefault();
    editQuesAns(editedAnswerBody, id);
    closeEditInput();
  };

  return (
    <div className={classes.quesAnsWrapper}>
      <div className={classes.voteColumn}>
        {user ? (
          <UpvoteButton
            checked={user ? upvotedBy.includes(user.id) : false}
            user={user}
            handleUpvote={upvoteQuesAns}
          />
        ) : (
          <AuthFormModal buttonType="upvote" />
        )}
        <Typography variant="h6" color="secondary">
          {points}
        </Typography>
        {user ? (
          <DownvoteButton
            checked={user ? downvotedBy.includes(user.id) : false}
            user={user}
            handleDownvote={downvoteQuesAns}
          />
        ) : (
          <AuthFormModal buttonType="downvote" />
        )}
        {isAnswer && user && user.id === quesAuthor.id && (
          <AcceptAnswerButton
            checked={acceptedAnswer === id}
            handleAcceptAns={acceptAnswer}
          />
        )}
        {isAnswer &&
          acceptedAnswer === id &&
          (!user || user.id !== quesAuthor.id) && (
            <SvgIcon className={classes.checkedAcceptIcon}>
              <AcceptedIcon />
            </SvgIcon>
          )}
      </div>
      <div className={classes.quesBody}>
        {!editAnsOpen ? (
          <Typography variant="body1" style={{ wordWrap: 'anywhere' }}>
            {body}
          </Typography>
        ) : (
          <form className={classes.smallForm} onSubmit={handleAnswerEdit}>
            <TextField
              value={editedAnswerBody}
              required
              fullWidth
              onChange={(e) => setEditedAnswerBody(e.target.value)}
              type="text"
              placeholder="Enter at least 30 characters"
              variant="outlined"
              size="small"
              multiline
              rows={4}
            />
            <div className={classes.submitCancelBtns}>
              <Button
                type="submit"
                size="small"
                variant="contained"
                color="primary"
                style={{ marginRight: 9 }}
              >
                Update Answer
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => setEditAnsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
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
          {!editAnsOpen && (
            <div className={classes.btnsWrapper}>
              {user && user.id === author.id && (
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  style={{ marginRight: 6 }}
                  className={classes.bottomBtns}
                  onClick={isAnswer ? openEditInput : editQuesAns}
                >
                  Edit
                </Button>
              )}
              {user && (user.id === author.id || user.role === 'ADMIN') && (
                <DeleteDialog
                  bodyType={isAnswer ? 'answer' : 'question'}
                  handleDelete={deleteQuesAns}
                />
              )}
            </div>
          )}
          <PostedByUser
            username={author.username}
            userId={author.id}
            createdAt={createdAt}
            updatedAt={updatedAt}
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
