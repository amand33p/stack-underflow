import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { ReactComponent as UpvoteIcon } from '../svg/upvote.svg';
import { ReactComponent as DownvoteIcon } from '../svg/downvote.svg';

import { DialogTitle } from './CustomDialogTitle';
import {
  Dialog,
  DialogContent,
  Button,
  MenuItem,
  useMediaQuery,
  Link,
  SvgIcon,
  IconButton,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useDialogStyles } from '../styles/muiStyles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const AuthFormModal = ({ closeMenu, buttonType }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [authType, setAuthType] = useState('login');
  const classes = useDialogStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleLoginModal = () => {
    setAuthType('login');
    setModalOpen(true);
    if (buttonType === 'mobile') {
      closeMenu();
    }
  };

  const handleSignupModal = () => {
    setAuthType('signup');
    setModalOpen(true);
    if (buttonType === 'mobile') {
      closeMenu();
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const triggerButton = () => {
    if (buttonType === 'ask') {
      return (
        <Button
          variant="contained"
          color="primary"
          size={isMobile ? 'small' : 'medium'}
          style={{ minWidth: '9em' }}
          onClick={handleLoginModal}
        >
          Ask Question
        </Button>
      );
    } else if (buttonType === 'link') {
      return (
        <Link onClick={handleLoginModal} style={{ cursor: 'pointer' }}>
          ask your own question.
        </Link>
      );
    } else if (buttonType === 'upvote') {
      return (
        <IconButton onClick={handleLoginModal}>
          <SvgIcon className={classes.upDownIcon}>
            <UpvoteIcon />
          </SvgIcon>
        </IconButton>
      );
    } else if (buttonType === 'downvote') {
      return (
        <IconButton onClick={handleLoginModal}>
          <SvgIcon className={classes.upDownIcon}>
            <DownvoteIcon />
          </SvgIcon>
        </IconButton>
      );
    } else if (buttonType === 'mobile') {
      return (
        <div>
          <MenuItem onClick={handleLoginModal}>
            <ExitToAppIcon className={classes.menuIcon} />
            Log In
          </MenuItem>
          <MenuItem onClick={handleSignupModal}>
            <PersonAddIcon className={classes.menuIcon} />
            Sign Up
          </MenuItem>
        </div>
      );
    } else {
      return (
        <div>
          <Button
            color="primary"
            variant="outlined"
            size="small"
            style={{ marginRight: 7 }}
            onClick={handleLoginModal}
          >
            Log In
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={handleSignupModal}
          >
            Sign Up
          </Button>
        </div>
      );
    }
  };

  return (
    <div style={{ display: 'inline' }}>
      {triggerButton()}
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        maxWidth="sm"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle onClose={handleModalClose}></DialogTitle>
        <DialogContent>
          {authType === 'login' ? (
            <LoginForm
              setAuthType={setAuthType}
              closeModal={handleModalClose}
            />
          ) : (
            <RegisterForm
              setAuthType={setAuthType}
              closeModal={handleModalClose}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthFormModal;
