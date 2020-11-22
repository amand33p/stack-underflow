import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { POST_ANSWER } from '../graphql/mutations';
import { VIEW_QUESTION } from '../graphql/queries';
import { useAuthContext } from '../context/auth';
import { useStateContext } from '../context/state';
import AuthFormModal from '../components/AuthFormModal';

import { Typography, Button, TextField, Chip, Link } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';

const AnswerForm = ({ quesId, tags }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuthContext();
  const { clearEdit } = useStateContext();
  const classes = useQuesPageStyles();

  const [addAnswer] = useMutation(POST_ANSWER, {
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
    },
  });

  const postAnswer = ({ answerBody }) => {
    addAnswer({
      variables: { quesId, body: answerBody },
      update: (proxy, { data }) => {
        reset();

        const dataInCache = proxy.readQuery({
          query: VIEW_QUESTION,
          variables: { quesId },
        });

        const updatedData = {
          ...dataInCache.viewQuestion,
          answers: data.postAnswer,
        };

        proxy.writeQuery({
          query: VIEW_QUESTION,
          variables: { quesId },
          data: { viewQuestion: updatedData },
        });
      },
    });
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
        <span>
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
          {user ? (
            <Link component={RouterLink} to="/ask" onClick={() => clearEdit()}>
              ask your own question.
            </Link>
          ) : (
            <AuthFormModal buttonType="link" />
          )}
        </span>
      </div>
    </div>
  );
};

export default AnswerForm;
