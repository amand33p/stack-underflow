import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

const DeleteDialog = ({ handleDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useQuesPageStyles();

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDeleteClick = () => {
    handleModalClose();
  };

  return (
    <div style={{ display: 'inline' }}>
      <Button
        size="small"
        color="secondary"
        startIcon={<DeleteTwoToneIcon />}
        className={classes.bottomBtns}
        onClick={handleModalOpen}
      >
        Delete
      </Button>
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your question?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
