import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import { DialogTitle } from './CustomDialogTitle';
import {
  Dialog,
  DialogContent,
  Button,
  MenuItem,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useDialogStyles } from '../styles/muiStyles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const AuthFormModal = ({ closeMenu }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [authType, setAuthType] = useState('login');
  const classes = useDialogStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleLoginModal = () => {
    setAuthType('login');
    setModalOpen(true);
    if (isMobile) {
      closeMenu();
    }
  };

  const handleSignupModal = () => {
    setAuthType('signup');
    setModalOpen(true);
    if (isMobile) {
      closeMenu();
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {!isMobile ? (
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
      ) : (
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
      )}
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
