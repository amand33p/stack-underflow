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

const DeleteDialog = ({ handleDelete, bodyType }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useQuesPageStyles();

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDeleteClick = () => {
    handleDelete();
    handleModalClose();
  };

  return (
    <div style={{ display: 'inline' }}>
      {bodyType === 'comment' ? (
        <Button
          size="small"
          color="primary"
          className={classes.commentBtns}
          onClick={handleModalOpen}
        >
          delete
        </Button>
      ) : (
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.bottomBtns}
          onClick={handleModalOpen}
        >
          Delete
        </Button>
      )}
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to delete your ${
              bodyType ? bodyType : 'question'
            }?`}
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
