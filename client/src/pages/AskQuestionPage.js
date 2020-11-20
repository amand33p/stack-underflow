import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { POST_QUESTION, EDIT_QUESTION } from '../graphql/mutations';
import { useStateContext } from '../context/state';

import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  Chip,
} from '@material-ui/core';
import { useAskQuesPageStyles } from '../styles/muiStyles';

const AskQuestionPage = () => {
  const classes = useAskQuesPageStyles();
  const history = useHistory();
  const { editValues, clearEdit } = useStateContext();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: editValues ? editValues.title : '',
      body: editValues ? editValues.body : '',
    },
  });
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(editValues ? editValues.tags : []);

  const [addQuestion, { addQuesLoading }] = useMutation(POST_QUESTION, {
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
    },
  });

  const [updateQuestion, { editQuesLoading }] = useMutation(EDIT_QUESTION, {
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
    },
  });

  const postQuestion = ({ title, body }) => {
    if (tags.length === 0) return console.log('tags needed');

    addQuestion({
      variables: { title, body, tags },
      update: (_, { data }) => {
        history.push(`/questions/${data.postQuestion.id}`);
        reset();
      },
    });
  };

  const editQuestion = ({ title, body }) => {
    if (tags.length === 0) return console.log('tags needed');

    updateQuestion({
      variables: { quesId: editValues.quesId, title, body, tags },
      update: (_, { data }) => {
        history.push(`/questions/${data.editQuestion.id}`);
        clearEdit();
        reset();
      },
    });
  };

  const handleTags = (e) => {
    if (tags.length > 5) {
      return console.log('only 5 tags pls');
    }

    const value = e.target.value.toLowerCase().trim();
    setTagInput(value);

    if (e.keyCode === 32 && value.trim() !== '') {
      if (tags.includes(value)) return console.log('dup');

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
          <TextField
            fullWidth
            value={tagInput}
            name="tags"
            type="text"
            label="Tags"
            variant="outlined"
            size="small"
            placeholder="Enter space button to add tags"
            className={classes.inputField}
            onChange={handleTags}
            onKeyDown={handleTags}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {tags.map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      variant="outlined"
                      color="primary"
                      size="small"
                      className={classes.tag}
                      onDelete={() =>
                        setTags((prevTags) => prevTags.filter((p) => p !== t))
                      }
                    />
                  ))}
                </InputAdornment>
              ),
            }}
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
      </form>
    </div>
  );
};

export default AskQuestionPage;
