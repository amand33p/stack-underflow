import { useState } from 'react';
import FormModal from './FormModal';
import LoginForm from './LoginForm';

import { Button } from '@material-ui/core';

const AuthButtons = ({ user, handleLogout }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [authType, setAuthType] = useState('login');

  const handleLoginModal = () => {
    setAuthType('login');
    setModalOpen(true);
  };

  const handleSignupModal = () => {
    setAuthType('signup');
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

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
      <FormModal modalOpen={modalOpen} handleModalClose={handleModalClose}>
        {authType === 'login' ? (
          <LoginForm setAuthType={setAuthType} />
        ) : (
          'Signup'
        )}
      </FormModal>
    </div>
  );
};

export default AuthButtons;
