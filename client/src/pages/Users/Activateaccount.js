import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import resetImg from "../../assets/images/reset.JPG";

import { connect } from "react-redux";
import { activateMyAccount } from "../../store/actions/auth-actions";

const useStyles = makeStyles((theme) => ({
  btn: {
    background: "#f7b500",
    color: "#fff",
    fontFamily: "inherit",
    fontSize: "16px",
    padding: "6px 30px",
    marginTop: "6px",
    "&:hover": {
      background: "#f7b500",
      color: "#fff",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const Activateaccount = (props) => {
  const classes = useStyles();
  const { params } = props.match;

  const activationHandler = () => {
    props.activateMyAccount(params, props.history);
  };

  return (
    <Wrapper>
      <div className="reset">
        <img src={resetImg} alt="" />
        <h2>من فضلك أضغط على الرابط التالي لتفعيل حسابك</h2>
        <Button
          onClick={activationHandler}
          size="medium"
          className={classes.btn}
        >
          تفعيل الحساب
        </Button>
      </div>
    </Wrapper>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { activateMyAccount })(Activateaccount);

const Wrapper = styled.div`
  text-align: center;
  .reset {
    text-aling: center;
    margin: 50px auto;
    max-width: 600px;
    h2 {
      font-size: 20px;
      max-width: 400px;
      margin: 0 auto;
      word-spacing: 2px;
    }
  }
`;
