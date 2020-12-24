import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support

import styled from "styled-components";
import logo from "../../../../assets/images/Project-Logo.png";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  btn: {
    background: "#f7b500",
    color: "#fff",
    fontFamily: "inherit",
    fontSize: "16px",
    padding: "6px 45px",
    "&:hover": {
      background: "#f7b500",
      color: "#fff",
    },
    "&:focus": {
      outline: "none",
    },
  },
  btn3: {
    borderColor: "#f7b500",
    color: "#f7b500",
    fontFamily: "inherit",
    fontSize: "16px",
    marginTop: "15px",
    padding: "6px 38px",
    "&:hover": {
      color: "#f7b500",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const Popup = ({ isOpen, handleClose, handleClick }) => {
  const classes = useStyles();
  const history = useHistory();


  return (
    <Wrapper>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <div className="d-flex flex-column align-items-center">
              <img src={logo} width="50px" height="50px" alt="" />
              <p
                style={{
                  maxWidth: "212px",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "rgba(16, 24, 32, 0.65)",
                  margin: "24px 0",
                }}
              >
                نحب أن تشارك معنا، يجب عليك التسجيل أولاً كي تتمكن من المشاركة
                معنا
              </p>
              <Button
                onClick={handleClick}
                fullWidth
                size="medium"
                className={classes.btn}
              >
                سجّل حساب جديد
              </Button>
              <Button
                onClick={handleClose}
                fullWidth
                variant="outlined"
                size="medium"
                className={classes.btn3}
              >
                لا أريد التسجيل الآن
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </Wrapper>
  );
};

export default Popup;
const Wrapper = styled.div`
  .MuiBackdrop-root {
    background: #d8d8d8 !important;
  }
`;
