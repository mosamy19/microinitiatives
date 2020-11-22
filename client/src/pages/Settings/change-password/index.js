import React, { useEffect, useState } from "react";
import { Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { connect } from "react-redux";
import { changePassword } from "../../../store/actions/auth-actions";

import styled from "styled-components";

const ChangePassword = (props) => {
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
    props.changePassword(user);
  };
  return (
    <Wrapper>
      <Form onSubmit={submitHandler} className="text-right">
        <FormGroup>
          <Label> كلمة السرّ الحالية</Label>
          <Input
            onChange={changeHanlder}
            type="password"
            name="oldPassword"
            invalid={error.oldPassword ? true : false}
          />
          {error.oldPassword && (
            <FormFeedback> {error.oldPassword} </FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label> كلمة السرّ الجديدة</Label>
          <Input
            onChange={changeHanlder}
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
            value="حفظ التغييرات"
            style={{ background: "#f7b500", color: "#fff" }}
          ></Input>
        </FormGroup>
      </Form>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { changePassword })(ChangePassword);

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
