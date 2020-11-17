import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthContext } from '../context/auth';

import { Typography, Button, TextField, Chip, Link } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';

const AnswerForm = ({ quesId, tags }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuthContext();
  const classes = useQuesPageStyles();

  const postAnswer = ({ answerBody }) => {
    console.log(answerBody);
  };

  return (
    <div className={classes.answerForm}>
      {user && (
        <Typography variant="h6" color="secondary">
          Your Answer
        </Typography>
      )}
      {user && (
        <form onSubmit={handleSubmit(postAnswer)}>
          <TextField
            inputRef={register}
            name="answerBody"
            required
            fullWidth
            type="text"
            placeholder="Enter atleast 30 characters"
            variant="outlined"
            size="small"
            multiline
            rows={5}
          />
          <div>
            <Button
              color="primary"
              variant="contained"
              style={{ marginTop: '0.8em' }}
              type="submit"
            >
              Post Your Answer
            </Button>
          </div>
        </form>
      )}
      <div className={classes.footerText}>
        <Typography variant="body1">
          Browse other questions tagged{' '}
          {tags.map((t) => (
            <Chip
              key={t}
              label={t}
              variant="outlined"
              color="primary"
              size="small"
              component={RouterLink}
              to={`/tags/${t}`}
              className={classes.footerTag}
              clickable
            />
          ))}{' '}
          or{' '}
          <Link component={RouterLink} to="/ask">
            ask your own question.
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default AnswerForm;
