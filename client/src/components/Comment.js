import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { formatDayTime } from '../utils/helperFuncs';

import { Typography, Link, Button, TextField } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';
import EditIcon from '@material-ui/icons/Edit';

const Comment = ({ comment, user, quesAnsId, editComment, deleteComment }) => {
  const [editOpen, setEditOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      editedCommentBody: comment.body,
    },
  });
  const classes = useQuesPageStyles();

  const closeInput = () => {
    setEditOpen(false);
  };

  const handleCommentEdit = ({ editedCommentBody }) => {
    editComment(editedCommentBody, comment.id, quesAnsId);
    closeInput();
    reset();
  };

  return (
    <div className={classes.commentWrapper}>
      {!editOpen ? (
        <div>
          <Typography variant="caption">
            {comment.body} –{' '}
            <Link
              component={RouterLink}
              to={`/user/${comment.author.username}`}
            >
              {comment.author.username}
            </Link>
            <Typography variant="caption" color="secondary">
              {` ${formatDayTime(comment.createdAt)} `}
            </Typography>
            {comment.createdAt !== comment.updatedAt && (
              <EditIcon fontSize="inherit" color="secondary" />
            )}
          </Typography>
          {user && user.id === comment.author.id && (
            <Button
              size="small"
              color="primary"
              className={classes.commentBtns}
              onClick={() => setEditOpen(true)}
            >
              edit
            </Button>
          )}
          {user && (user.id === comment.author.id || user.role === 'admin') && (
            <Button
              size="small"
              color="primary"
              className={classes.commentBtns}
              onClick={() => deleteComment(comment.id, quesAnsId)}
            >
              delete
            </Button>
          )}
        </div>
      ) : (
        <form
          className={classes.commentForm}
          onSubmit={handleSubmit(handleCommentEdit)}
        >
          <TextField
            inputRef={register}
            name="editedCommentBody"
            required
            fullWidth
            type="text"
            placeholder="Enter at least 5 characters"
            variant="outlined"
            size="small"
            multiline
            rows={2}
          />
          <div className={classes.addCommentBtns}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              style={{ marginRight: 9 }}
              onClick={() => setEditOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
            >
              Update Comment
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Comment;
