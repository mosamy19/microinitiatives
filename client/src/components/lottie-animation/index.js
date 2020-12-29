import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import Lottie from "react-lottie";
import animationData from "../../assets/lotties/congrate.json";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLottieClose } from "../../store/actions/lottie-actions";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "none",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "relative",
    background: "none",
  },
  text: {
    fontFamily: "inherit",
    fontSize: "24px",
    fontWeight: "bold",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: 1,
  },
  opc: {
    opacity: 0.5,
    transition: "opacity 3s ease-in",
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

const Lottieforcelebration = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  //   const [open, setOpen] = useState(false);

  const { isOpen } = useSelector((state) => state.lottie);
  //   console.log(isOpen);
  //   useEffect(() => {
  //     if (isOpen) {
  //       setOpen(isOpen);
  //     }
  //   }, [isOpen]);

  //   useEffect(() => {
  //     setTimeout(() => {
  //       handleClose();
  //     }, 3000);
  //   }, []);

  const handleClose = () => {
    dispatch(setLottieClose());
  };

  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
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
          className: classes.root,
          transitionDuration: 3000,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <Lottie options={options} height="100vh" width="100vw" />
            <div className={`${isOpen ? classes.opc : null} ${classes.text}`}>
              مبروك
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Lottieforcelebration;
