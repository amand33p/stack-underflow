import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { formatDayTime } from '../utils/helperFuncs';

import {
  Typography,
  Link,
  Divider,
  Button,
  TextField,
} from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';
import EditIcon from '@material-ui/icons/Edit';

const CommentSection = ({
  user,
  comments,
  addComment,
  editComment,
  deleteComment,
}) => {
  const [visibleComments, setVisibleComments] = useState(comments.slice(0, 3));
  const [inputOpen, setInputOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const classes = useQuesPageStyles();

  const closeInput = () => {
    setInputOpen(false);
  };

  return (
    <div className={classes.commentSection}>
      {visibleComments.map((c) => (
        <div key={c.id}>
          <div className={classes.commentWrapper}>
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
            {user && user.id === c.author.id && (
              <Button
                size="small"
                color="primary"
                className={classes.commentBtns}
                onClick={() => editComment(c.id)}
              >
                edit
              </Button>
            )}
            {user && (user.id === c.author.id || user.role === 'admin') && (
              <Button
                size="small"
                color="primary"
                className={classes.commentBtns}
                onClick={() => deleteComment(c.id)}
              >
                delete
              </Button>
            )}
          </div>
          <Divider />
        </div>
      ))}
      {visibleComments.length !== comments.length ? (
        <Button
          size="small"
          color="primary"
          onClick={() => setVisibleComments(comments)}
        >
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
          onSubmit={handleSubmit((data) => addComment(data, reset, closeInput))}
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
