import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";

import { connect } from "react-redux";
import { register } from "../../store/actions/auth-actions";

import styled from "styled-components";

const Signup = (props) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const changeHanlder = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    setError({});
  };

  useEffect(() => {
    setError(props.auth.error);
  }, [props.auth.error]);

  const submitHandler = (e) => {
    e.preventDefault();
    props.register(user, props.history);
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
          تسجيل حساب جديد
        </h2>
        <Form onSubmit={submitHandler} className="text-right">
          <FormGroup>
            <Label>الاسم الأول</Label>
            <Input
              onChange={changeHanlder}
              type="text"
              name="firstName"
              invalid={error.firstName ? true : false}
            />
            {error.firstName && (
              <FormFeedback> {error.firstName} </FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label>اسم العائلة</Label>
            <Input
              onChange={changeHanlder}
              type="text"
              name="familyName"
              invalid={error.familyName ? true : false}
            />
            {error.familyName && (
              <FormFeedback> {error.familyName} </FormFeedback>
            )}
          </FormGroup>
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
            <Label>حدد كلمة السرّ لحسابك</Label>
            <Input
              onChange={changeHanlder}
              type="password"
              name="password"
              invalid={error.password ? true : false}
            />
            {error.password && <FormFeedback> {error.password} </FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label>تأكد من كلمة السرّ </Label>
            <Input
              onChange={changeHanlder}
              type="password"
              name="confirmPassword"
              invalid={error.confirmPassword ? true : false}
            />
            {error.confirmPassword && (
              <FormFeedback> {error.confirmPassword} </FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Input
              type="submit"
              value="سجّل حساب جديد"
              style={{ background: "#f7b500", color: "#fff" }}
            ></Input>
          </FormGroup>
        </Form>
        <div>
          <p style={{ fontSize: "14px", color: "rgba(16, 24, 32, 0.65)" }}>
            لديك حساب؟ يمكنك الدخول{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              {" "}
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
export default connect(mapStateToProps, { register })(Signup);

const Wrapper = styled.div`
  .myform {
    max-width: 380px;
    margin: 64px auto;
    text-align: center;
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
