import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/auth-actions";
import styled from "styled-components";

const Login = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  const tempError = useSelector((state) => state.auth.error);
  useEffect(() => {
    if (tempError) {
      setError(tempError);
    }
  }, [tempError]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(user, history));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
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
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
                setError({ ...error, email: "" });
              }}
              type="email"
              name="email"
              invalid={error.email ? true : false}
            />
            {error.email && <FormFeedback> {error.email} </FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label> كلمة السرّ </Label>
            <Input
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                setError({ ...error, password: "" });
              }}
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

export default Login;
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
