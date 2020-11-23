import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';
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
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Required')
    .max(20, 'Must be at most 20 characters')
    .min(3, 'Must be at least 3 characters')
    .matches(
      /^[a-zA-Z0-9-_]*$/,
      'Only alphanum, dash & underscore characters are allowed'
    ),
  password: yup
    .string()
    .required('Required')
    .min(6, 'Must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Required')
    .min(6, 'Must be at least 6 characters'),
});

const RegisterForm = ({ setAuthType, closeModal }) => {
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showConfPass, setShowConfPass] = useState(false);
  const classes = useAuthFormStyles();
  const { setUser } = useAuthContext();
  const { notify } = useStateContext();
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onError: (err) => {
      setErrorMsg(getErrorMsg(err));
    },
  });

  const onRegister = ({ username, password, confirmPassword }) => {
    if (password !== confirmPassword)
      return setErrorMsg('Both passwords need to match.');

    registerUser({
      variables: { username, password },
      update: (_, { data }) => {
        setUser(data.register);
        notify(
          `Welcome, ${data.register.username}! You've successfully registered.`
        );
        reset();
        closeModal();
      },
    });
  };

  return (
    <div className={classes.root}>
      <img src={SofLogo} alt="sof-logo" className={classes.titleLogo} />
      <form onSubmit={handleSubmit(onRegister)}>
        <div className={classes.inputField}>
          <TextField
            required
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
        <div className={classes.inputField}>
          <TextField
            required
            fullWidth
            inputRef={register}
            name="confirmPassword"
            type={showConfPass ? 'text' : 'password'}
            label="Confirm Password"
            variant="outlined"
            size="small"
            error={'confirmPassword' in errors}
            helperText={
              'confirmPassword' in errors ? errors.confirmPassword.message : ''
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfPass((prevState) => !prevState)}
                    size="small"
                  >
                    {showConfPass ? (
                      <VisibilityOffIcon color="secondary" />
                    ) : (
                      <VisibilityIcon color="secondary" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <EnhancedEncryptionIcon color="primary" />
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
          startIcon={<PersonAddIcon />}
          type="submit"
          disabled={loading}
        >
          Sign Up
        </Button>
      </form>
      <Typography variant="body1" className={classes.footerText}>
        Already have an account?{' '}
        <Link onClick={() => setAuthType('login')} className={classes.link}>
          Log In
        </Link>
      </Typography>
      <ErrorMessage
        errorMsg={errorMsg}
        clearErrorMsg={() => setErrorMsg(null)}
      />
    </div>
  );
};

export default RegisterForm;
