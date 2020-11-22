import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";

import { connect } from "react-redux";
import { login } from "../../store/actions/auth-actions";
import styled from "styled-components";
// import Alerts from "../../components/Alert";

const Login = (props) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  // const [success, setSuccess] = useState({});

  const changeHanlder = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    setError({});
  };

  useEffect(() => {
    setError(props.auth.error);
  }, [props.auth.error]);

  const submitHandler = (e) => {
    e.preventDefault();
    props.login(user, props.history);
  };
  return (
    <Wrapper>
      {/* {error.message && (
        <Alerts type="error" message={error.message} isOpen={true} />
      )}
      {success.message && (
        <Alerts type="success" message={success.message} isOpen={true} />
      )} */}
      <div className="myform">
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "rgba(0, 0, 0, 0.85)",
          }}
        >
          دخول
        </h2>
        <Form onSubmit={submitHandler} className="text-right">
          <FormGroup>
            <Label>البريد الالكتروني</Label>
            <Input
              onChange={changeHanlder}
              type="email"
              name="email"
              invalid={error.email ? true : false}
            />
            {error.email && <FormFeedback> {error.email} </FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label> كلمة السرّ </Label>
            <Input
              onChange={changeHanlder}
              type="password"
              name="password"
              invalid={error.password ? true : false}
            />
            {error.password && <FormFeedback> {error.password} </FormFeedback>}
            <p style={{ textAlign: "left", margin: "6px 0" }}>
              <Link
                to="/forget-password"
                style={{
                  textDecoration: "none",
                  color: "rgba(0, 0, 0, 0.5)",
                  fontSize: "12px",
                }}
              >
                نسيت كلمة السرّ؟
              </Link>
            </p>
          </FormGroup>
          <FormGroup>
            <Input
              type="submit"
              value="سجّل  الدخول"
              style={{ background: "#f7b500", color: "#fff" }}
            ></Input>
          </FormGroup>
        </Form>
        <div>
          <p style={{ fontSize: "14px", color: "rgba(16, 24, 32, 0.65)" }}>
            ليس لديك حساب؟ يمكنك التسجيل{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              من هنا
            </Link>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { login })(Login);
const Wrapper = styled.div`
  .myform {
    margin: 64px auto;
    text-align: center;
    max-width: 380px;
    input {
      border: none;
      font-size: 14px;
    }
    label {
      font-size: 14px;
      color: rgba(16, 24, 32, 0.65);
    }
    .is-invalid {
      border: 1px solid #dc3545;
      padding-left: calc(1.5em + 0.75rem);
      background-position: left calc(0.375em + 0.1875rem) center;
    }
  }
`;
