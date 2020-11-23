import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Comment from './Comment';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Divider, Button, TextField } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';

const validationSchema = yup.object({
  commentBody: yup.string().min(5, 'Must be at least 5 characters'),
});

const CommentSection = ({
  user,
  comments,
  addComment,
  editComment,
  deleteComment,
  quesAnsId,
}) => {
  const classes = useQuesPageStyles();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [inputOpen, setInputOpen] = useState(false);
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const closeInput = () => {
    setInputOpen(false);
  };

  const showComments = () => {
    setIsCollapsed(false);
  };

  const handleCommentAdd = ({ commentBody }) => {
    addComment(commentBody, quesAnsId);
    showComments();
    closeInput();
    reset();
  };

  const visibleComments = isCollapsed ? comments.slice(0, 3) : comments;

  return (
    <div className={classes.commentSection}>
      {comments.length !== 0 && <Divider />}
      {visibleComments.map((c) => (
        <div key={c.id}>
          <Comment
            comment={c}
            user={user}
            quesAnsId={quesAnsId}
            editComment={editComment}
            deleteComment={deleteComment}
          />
          <Divider />
        </div>
      ))}
      {visibleComments.length !== comments.length ? (
        <Button size="small" color="primary" onClick={showComments}>
          show {comments.length - visibleComments.length} more comments
        </Button>
      ) : (
        user &&
        !inputOpen && (
          <Button
            size="small"
            color="primary"
            onClick={() => setInputOpen(true)}
          >
            add a comment
          </Button>
        )
      )}
      {inputOpen && (
        <form
          className={classes.smallForm}
          onSubmit={handleSubmit(handleCommentAdd)}
        >
          <TextField
            inputRef={register}
            name="commentBody"
            required
            fullWidth
            type="text"
            placeholder="Enter at least 5 characters"
            variant="outlined"
            size="small"
            multiline
            rows={3}
            error={'commentBody' in errors}
            helperText={
              'commentBody' in errors ? errors.commentBody.message : ''
            }
          />
          <div className={classes.submitCancelBtns}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              style={{ marginRight: 9 }}
            >
              Add Comment
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => setInputOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
