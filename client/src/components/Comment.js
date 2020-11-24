import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import DeleteDialog from './DeleteDialog';
import { formatDayTime } from '../utils/helperFuncs';

import { Typography, Link, Button, TextField } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';
import EditIcon from '@material-ui/icons/Edit';

const Comment = ({ comment, user, quesAnsId, editComment, deleteComment }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editedCommentBody, setEditedCommentBody] = useState(comment.body);
  const classes = useQuesPageStyles();

  useEffect(() => {
    setEditedCommentBody(comment.body);
  }, [comment]);

  const closeInput = () => {
    setEditOpen(false);
  };

  const handleCommentEdit = (e) => {
    e.preventDefault();
    editComment(editedCommentBody, comment.id, quesAnsId);
    closeInput();
  };

  return (
    <div className={classes.commentWrapper}>
      {!editOpen ? (
        <div>
          <Typography variant="caption" style={{ wordWrap: 'anywhere' }}>
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
          {user && (user.id === comment.author.id || user.role === 'ADMIN') && (
            <DeleteDialog
              bodyType="comment"
              handleDelete={() => deleteComment(comment.id, quesAnsId)}
            />
          )}
        </div>
      ) : (
        <form className={classes.smallForm} onSubmit={handleCommentEdit}>
          <TextField
            value={editedCommentBody}
            required
            fullWidth
            type="text"
            placeholder="Enter at least 5 characters"
            variant="outlined"
            size="small"
            multiline
            rows={2}
            onChange={(e) => setEditedCommentBody(e.target.value)}
          />
          <div className={classes.submitCancelBtns}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              style={{ marginRight: 9 }}
            >
              Update Comment
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => setEditOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Comment;
