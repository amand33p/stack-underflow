import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import { useAuthContext } from '../context/auth';
import { useStateContext } from '../context/state';
import ErrorMessage from './ErrorMessage';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SofLogo from '../svg/stack-overflow.svg';
import { getErrorMsg } from '../utils/helperFuncs';

import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
} from '@material-ui/core';
import { useAuthFormStyles } from '../styles/muiStyles';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

const validationSchema = yup.object({
  username: yup.string().required('Required'),
  password: yup.string().required('Required'),
});

const LoginForm = ({ setAuthType, closeModal }) => {
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const classes = useAuthFormStyles();
  const { setUser } = useAuthContext();
  const { notify } = useStateContext();
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onError: (err) => {
      setErrorMsg(getErrorMsg(err));
    },
  });

  const onLogin = ({ username, password }) => {
    loginUser({
      variables: { username, password },
      update: (_, { data }) => {
        setUser(data.login);
        notify(`Welcome, ${data.login.username}! You're logged in.`);
        reset();
        closeModal();
      },
    });
  };

  return (
    <div className={classes.root}>
      <img src={SofLogo} alt="sof-logo" className={classes.titleLogo} />
      <form onSubmit={handleSubmit(onLogin)}>
        <div className={classes.inputField}>
          <TextField
            fullWidth
            inputRef={register}
            name="username"
            type="text"
            label="Username"
            variant="outlined"
            size="small"
            error={'username' in errors}
            helperText={'username' in errors ? errors.username.message : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.inputField}>
          <TextField
            required
            fullWidth
            inputRef={register}
            name="password"
            type={showPass ? 'text' : 'password'}
            label="Password"
            variant="outlined"
            size="small"
            error={'password' in errors}
            helperText={'password' in errors ? errors.password.message : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPass((prevState) => !prevState)}
                    size="small"
                  >
                    {showPass ? (
                      <VisibilityOffIcon color="secondary" />
                    ) : (
                      <VisibilityIcon color="secondary" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          startIcon={<ExitToAppIcon />}
          type="submit"
          disabled={loading}
        >
          Log In
        </Button>
      </form>
      <Typography variant="body1" className={classes.footerText}>
        Don’t have an account?{' '}
        <Link onClick={() => setAuthType('signup')} className={classes.link}>
          Sign Up
        </Link>
      </Typography>
      <ErrorMessage
        errorMsg={errorMsg}
        clearErrorMsg={() => setErrorMsg(null)}
      />
    </div>
  );
};

export default LoginForm;
