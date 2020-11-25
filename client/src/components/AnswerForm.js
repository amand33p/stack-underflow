import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { POST_ANSWER } from '../graphql/mutations';
import { VIEW_QUESTION } from '../graphql/queries';
import { useAuthContext } from '../context/auth';
import { useStateContext } from '../context/state';
import AuthFormModal from '../components/AuthFormModal';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getErrorMsg } from '../utils/helperFuncs';

import { Typography, Button, TextField, Chip, Link } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';

const validationSchema = yup.object({
  answerBody: yup.string().min(30, 'Must be at least 30 characters'),
});

const AnswerForm = ({ quesId, tags }) => {
  const classes = useQuesPageStyles();
  const { user } = useAuthContext();
  const { clearEdit, notify } = useStateContext();
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const [addAnswer, { loading }] = useMutation(POST_ANSWER, {
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
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

        notify('Answer submitted!');
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
            error={'answerBody' in errors}
            helperText={'answerBody' in errors ? errors.answerBody.message : ''}
            multiline
            rows={5}
          />
          <div>
            <Button
              color="primary"
              variant="contained"
              style={{ marginTop: '0.8em' }}
              type="submit"
              disabled={loading}
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
          ))}
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
