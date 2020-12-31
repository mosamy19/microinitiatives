import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../store/actions/auth-actions";

import styled from "styled-components";

const Forgetpassword = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({ email: "" });
  const [error, setError] = useState({ email: "" });

  const tempError = useSelector((state) => state.auth.error);
  useEffect(() => {
    if (tempError) {
      setError(tempError);
    }
  }, [tempError]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(data, history));
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
            <Label>من فضلك أدخل بريدك الالكتروني المسجّل معنا</Label>
            <Input
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
                setError({ ...error, email: "" });
              }}
              type="email"
              name="email"
              invalid={error.email ? true : false}
            />
            {error.email && <FormFeedback> {error.email} </FormFeedback>}
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

export default Forgetpassword;
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
