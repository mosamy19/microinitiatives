import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alerts = ({ isOpen, type, message }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(isOpen);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Wrapper className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
            {message}
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

export default Alerts;
const Wrapper = styled.div``;
