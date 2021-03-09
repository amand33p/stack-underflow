import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { POST_QUESTION, EDIT_QUESTION } from '../graphql/mutations';
import { useStateContext } from '../context/state';
import ErrorMessage from '../components/ErrorMessage';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getErrorMsg } from '../utils/helperFuncs';

import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  Chip,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useAskQuesPageStyles } from '../styles/muiStyles';

const validationSchema = yup.object({
  title: yup
    .string()
    .required('Required')
    .min(15, 'Must be at least 15 characters'),
  body: yup
    .string()
    .required('Required')
    .min(30, 'Must be at least 30 characters'),
});

const AskQuestionPage = () => {
  const classes = useAskQuesPageStyles();
  const history = useHistory();
  const { editValues, clearEdit, notify } = useStateContext();
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(editValues ? editValues.tags : []);
  const [errorMsg, setErrorMsg] = useState(null);
  const { register, handleSubmit, reset, errors } = useForm({
    defaultValues: {
      title: editValues ? editValues.title : '',
      body: editValues ? editValues.body : '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const [addQuestion, { loading: addQuesLoading }] = useMutation(
    POST_QUESTION,
    {
      onError: (err) => {
        setErrorMsg(getErrorMsg(err));
      },
    }
  );

  const [updateQuestion, { loading: editQuesLoading }] = useMutation(
    EDIT_QUESTION,
    {
      onError: (err) => {
        setErrorMsg(getErrorMsg(err));
      },
    }
  );

  const postQuestion = ({ title, body }) => {
    if (tags.length === 0) return setErrorMsg('Atleast one tag must be added.');

    addQuestion({
      variables: { title, body, tags },
      update: (_, { data }) => {
        history.push(`/questions/${data.postQuestion.id}`);
        reset();
        notify('Question posted!');
      },
    });
  };

  const editQuestion = ({ title, body }) => {
    if (tags.length === 0) return setErrorMsg('Atleast one tag must be added.');

    updateQuestion({
      variables: { quesId: editValues.quesId, title, body, tags },
      update: (_, { data }) => {
        history.push(`/questions/${data.editQuestion.id}`);
        clearEdit();
        notify('Question edited!');
      },
    });
  };

  const handleTags = (e) => {
    if (!e || (!e.target.value && e.target.value !== '')) return;
    const value = e.target.value.toLowerCase().trim();
    setTagInput(value);

    const keyCode = e.target.value
      .charAt(e.target.selectionStart - 1)
      .charCodeAt();

    if (keyCode === 32 && value.trim() !== '') {
      if (tags.includes(value))
        return setErrorMsg(
          "Duplicate tag found! You can't add the same tag twice."
        );

      if (!/^[a-zA-Z0-9-]*$/.test(value)) {
        return setErrorMsg('Only alphanumeric characters & dash are allowed.');
      }

      if (tags.length >= 5) {
        setTagInput('');
        return setErrorMsg('Max 5 tags can be added! Not more than that.');
      }

      if (value.length > 15) {
        return setErrorMsg("A single tag can't have more than 15 characters.");
      }

      setTags((prevTags) => [...prevTags, value]);
      setTagInput('');
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" color="secondary">
        {editValues ? 'Edit Your Question' : 'Ask A Question'}
      </Typography>
      <form
        className={classes.quesForm}
        onSubmit={
          editValues ? handleSubmit(editQuestion) : handleSubmit(postQuestion)
        }
      >
        <div className={classes.inputWrapper}>
          <Typography variant="caption" color="secondary">
            Be specific and imagine you’re asking a question to another person
          </Typography>
          <TextField
            required
            fullWidth
            inputRef={register}
            name="title"
            placeholder="Enter atleast 15 characters"
            type="text"
            label="Title"
            variant="outlined"
            size="small"
            error={'title' in errors}
            helperText={'title' in errors ? errors.title.message : ''}
            className={classes.inputField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div></div>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.inputWrapper}>
          <Typography variant="caption" color="secondary">
            Include all the information someone would need to answer your
            question
          </Typography>
          <TextField
            required
            multiline
            rows={5}
            fullWidth
            inputRef={register}
            name="body"
            placeholder="Enter atleast 30 characters"
            type="text"
            label="Body"
            variant="outlined"
            size="small"
            error={'body' in errors}
            helperText={'body' in errors ? errors.body.message : ''}
            className={classes.inputField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div></div>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.inputWrapper}>
          <Typography variant="caption" color="secondary">
            Add up to 5 tags to describe what your question is about
          </Typography>
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            getOptionLabel={(option) => option}
            value={tags}
            inputValue={tagInput}
            onInputChange={handleTags}
            onChange={(e, value, reason) => {
              setTags(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Tags"
                placeholder="Enter space button to add tags"
                onKeyDown={handleTags}
                fullWidth
                className={classes.inputField}
                size="small"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  color="primary"
                  size="small"
                  {...getTagProps({ index })}
                />
              ))
            }
          />
        </div>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          className={classes.submitBtn}
          disabled={addQuesLoading || editQuesLoading}
        >
          {editValues ? 'Update Your Question' : 'Post Your Question'}
        </Button>
        <ErrorMessage
          errorMsg={errorMsg}
          clearErrorMsg={() => setErrorMsg(null)}
        />
      </form>
    </div>
  );
};

export default AskQuestionPage;
