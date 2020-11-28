import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { closeSnackbar } from "../../store/actions/snackbar-actions";
import { useSelector, useDispatch } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomSnackbar = (props) => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.snackbar.isOpen);
  const message = useSelector((state) => state.snackbar.message);
  const severity = useSelector((state) => state.snackbar.severity);

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity || "success"}>
        {message
          ? message
          : severity === "success"
          ? "قد تم الحدث!"
          : "لم يتم الحدث!"}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
