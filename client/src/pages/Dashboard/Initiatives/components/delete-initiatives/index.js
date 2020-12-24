import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Deleteinitiative = ({ userId, isOpen, handleCancel }) => {
  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={isOpen}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Initiative</DialogTitle>
        <DialogContent>
          <div className="d-flex align-items-center">
            <ExclamationCircleOutlined className="text-warning" />{" "}
            <Typography className="mx-2">
              Are you sure you want to delete this initiative
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="danger">
            No
          </Button>
          <Button onClick={handleCancel} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Deleteinitiative;
