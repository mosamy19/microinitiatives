import React, { useEffect, useState } from "react";
import { Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../store/actions/auth-actions";

import styled from "styled-components";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const tempError = useSelector((state) => state.auth.error);
  useEffect(() => {
    if (tempError) {
      setError(tempError);
    }
  }, [tempError]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(changePassword(user));
    setUser({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };
  return (
    <Wrapper>
      <Form onSubmit={submitHandler} className="text-right">
        <FormGroup>
          <Label> كلمة السرّ الحالية</Label>
          <Input
            onChange={(e) => {
              setUser({ ...user, oldPassword: e.target.value });
              setError({ ...error, oldPassword: "" });
            }}
            type="password"
            name="oldPassword"
            value={user.oldPassword}
            invalid={error.oldPassword ? true : false}
          />
          {error.oldPassword && (
            <FormFeedback> {error.oldPassword} </FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label> كلمة السرّ الجديدة</Label>
          <Input
            onChange={(e) => {
              setUser({ ...user, newPassword: e.target.value });
              setError({ ...error, newPassword: "" });
            }}
            value={user.newPassword}
            type="password"
            name="newPassword"
            invalid={error.newPassword ? true : false}
          />
          {error.newPassword && (
            <FormFeedback> {error.newPassword} </FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label>تأكيد كلمة السرّ الجديدة </Label>
          <Input
            onChange={(e) => {
              setUser({ ...user, confirmPassword: e.target.value });
              setError({ ...error, confirmPassword: "" });
            }}
            value={user.confirmPassword}
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
            value="حفظ التغييرات"
            style={{ background: "#f7b500", color: "#fff" }}
          ></Input>
        </FormGroup>
      </Form>
    </Wrapper>
  );
};

export default ChangePassword;

const Wrapper = styled.div`
  input {
    border: none;
    font-size: 14px;
    resize: none;
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
`;
