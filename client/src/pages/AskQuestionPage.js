import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  Chip,
} from '@material-ui/core';
import { useAskQuesPageStyles } from '../styles/muiStyles';

const AskQuestionPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const classes = useAskQuesPageStyles();

  const postQuestion = ({ title, body }) => {
    console.log(title, body, tags);
  };

  const handleTags = (e) => {
    if (tags.length > 5) {
      return console.log('only 5 tags pls');
    }

    setTagInput(e.target.value.toLowerCase());

    if (tags.find((t) => t === setTagInput)) {
      setTagInput('');
      return console.log('duplicate');
    }

    if (e.keyCode === 32 && setTagInput.trim() !== '') {
      setTags((prevTags) => [...prevTags, setTagInput]);
      setTagInput('');
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" color="secondary">
        Ask A Question
      </Typography>
      <form className={classes.quesForm} onSubmit={handleSubmit(postQuestion)}>
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
          />
        </div>
        <div className={classes.inputWrapper}>
          <Typography variant="caption" color="secondary">
            Add up to 5 tags to describe what your question is about
          </Typography>
          <TextField
            required
            fullWidth
            value={tagInput}
            name="tags"
            type="text"
            label="Tags"
            variant="outlined"
            size="small"
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
        >
          Post Your Question
        </Button>
      </form>
    </div>
  );
};

export default AskQuestionPage;
