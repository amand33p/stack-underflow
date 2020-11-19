import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Comment from './Comment';

import { Divider, Button, TextField } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';

const CommentSection = ({
  user,
  comments,
  addComment,
  editComment,
  deleteComment,
  quesAnsId,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [inputOpen, setInputOpen] = useState(false);
  //const [editOpen, setEditOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const classes = useQuesPageStyles();

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
          className={classes.commentForm}
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
          />
          <div className={classes.addCommentBtns}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              style={{ marginRight: 9 }}
              onClick={() => setInputOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
            >
              Add Comment
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
