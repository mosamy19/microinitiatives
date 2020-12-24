import React from "react";
import styled from "styled-components";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const Adduser = ({ userId, isOpen, handleCancel }) => {
  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={isOpen}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="danger">
            Cancel
          </Button>
          <Button onClick={handleCancel} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Adduser;
