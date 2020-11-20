import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UpvoteButton, DownvoteButton } from './VoteButtons';
import { useAuthContext } from '../context/auth';
import PostedByUser from './PostedByUser';
import CommentSection from './CommentSection';
import AcceptAnswerButton from './AcceptAnswerButton';
import DeleteDialog from './DeleteDialog';
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
  } = quesAns;

  const classes = useQuesPageStyles();
  const { user } = useAuthContext();
  const [editAnsOpen, setEditAnsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      editedAnswerBody: body,
    },
  });

  const openEditInput = () => {
    setEditAnsOpen(true);
  };

  const closeEditInput = () => {
    setEditAnsOpen(false);
  };

  const handleAnswerEdit = ({ editedAnswerBody }) => {
    editQuesAns(editedAnswerBody, id);
    closeEditInput();
    reset();
  };

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
            checked={acceptedAnswer === id}
            handleAcceptAns={acceptAnswer}
          />
        )}
        {isAnswer && acceptedAnswer === id && (!user || user.id !== author.id) && (
          <SvgIcon className={classes.checkedAcceptIcon}>
            <AcceptedIcon />
          </SvgIcon>
        )}
      </div>
      <div className={classes.quesBody}>
        {!editAnsOpen ? (
          <Typography variant="body1">{body}</Typography>
        ) : (
          <form
            className={classes.smallForm}
            onSubmit={handleSubmit(handleAnswerEdit)}
          >
            <TextField
              inputRef={register}
              name="editedAnswerBody"
              required
              fullWidth
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
              {user && (user.id === author.id || user.role === 'admin') && (
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
