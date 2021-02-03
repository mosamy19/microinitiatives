import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/actions/auth-actions";
import { hideLoading } from "../../store/actions/loading-actions";
import styled from "styled-components";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 14, color: "#fff" }} spin />
);

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: "",
    familyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    firstName: "",
    familyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { isLoading } = useSelector((state) => state.loader);
  const tempError = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (tempError) {
      setError(tempError);
    }
  }, [tempError]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(user, history));
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
              onChange={(e) => {
                setUser({ ...user, firstName: e.target.value });
                dispatch(hideLoading());
                setError({ ...error, firstName: "" });
              }}
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
              onChange={(e) => {
                setUser({ ...user, familyName: e.target.value });
                dispatch(hideLoading());
                setError({ ...error, familyName: "" });
              }}
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
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
                dispatch(hideLoading());
                setError({ ...error, email: "" });
              }}
              type="email"
              name="email"
              invalid={error.email ? true : false}
            />
            {error.email && <FormFeedback> {error.email} </FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label>حدد كلمة السرّ لحسابك</Label>
            <Input
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                dispatch(hideLoading());
                setError({ ...error, password: "" });
              }}
              type="password"
              name="password"
              invalid={error.password ? true : false}
            />
            {error.password && <FormFeedback> {error.password} </FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label>تأكد من كلمة السرّ </Label>
            <Input
              onChange={(e) => {
                setUser({ ...user, confirmPassword: e.target.value });
                dispatch(hideLoading());
                setError({ ...error, confirmPassword: "" });
              }}
              type="password"
              name="confirmPassword"
              invalid={error.confirmPassword ? true : false}
            />
            {error.confirmPassword && (
              <FormFeedback> {error.confirmPassword} </FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <div style={{ position: "relative", width: "100%" }}>
              <Input
                type="submit"
                value="سجّل حساب جديد"
                style={{ background: "#f7b500", color: "#fff" }}
                disabled={isLoading ? true : false}
              />
              {isLoading ? (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "32%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Spin indicator={antIcon} />
                </div>
              ) : null}
            </div>
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

export default Signup;

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
