import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import styled from "styled-components";

import { connect } from "react-redux";
import { resetPassword } from "../../store/actions/auth-actions";

const Resetpassword = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const { token } = props.match.params;
  const [error, setError] = useState({});
  const changeHanlder = (event) => {
    setNewPassword(event.target.value);
    setError({});
  };

  useEffect(() => {
    setError(props.auth.error);
  }, [props.auth.error]);

  const submitHandler = (e) => {
    e.preventDefault();
    props.resetPassword({ token, newPassword }, props.history);
  };
  return (
    <Wrapper>
      <div className="myform">
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "rgba(0, 0, 0, 0.85)",
            marginBottom: "32px",
          }}
        >
          استعادة كلمة السرّ
        </h2>
        <Form onSubmit={submitHandler} className="text-right">
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
              value="  أرسل"
              style={{ background: "#f7b500", color: "#fff" }}
            ></Input>
          </FormGroup>
        </Form>
        <div>
          <p style={{ fontSize: "14px", color: "rgba(16, 24, 32, 0.65)" }}>
            تريد أن ترجع إلى صفحة الدخول ؟ يمكنك{" "}
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
export default connect(mapStateToProps, { resetPassword })(Resetpassword);

const Wrapper = styled.div`
  .myform {
    margin: 50px auto;
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
