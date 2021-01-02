import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { receiveEmail } from "../../../store/actions/contactus-action";

const Contactform = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  const fomrValidation = () => {
    const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (data.name === "") {
      setErrors({ ...errors, name: "هذه الخانة مطلوبة" });
      return false;
    }
    if (data.email === "") {
      setErrors({ ...errors, email: "هذه الخانة مطلوبة" });
      return false;
    } else if (!checkEmail.test(String(data.email).toLowerCase())) {
      setErrors({
        ...errors,
        email: " البريد الإلكتروني الذي أدخلته غير صحيح ",
      });
      return false;
    }
    if (data.message === "") {
      setErrors({ ...errors, message: "هذه الخانة مطلوبة" });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = fomrValidation();
    if (isValid) {
      dispatch(receiveEmail(data, history));
    }
  };
  return (
    <div>
      <Wrapper>
        <div className="myform">
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "rgba(0, 0, 0, 0.85)",
            }}
          >
            اتصل بنا
          </h2>
          <Form onSubmit={handleSubmit} className="text-right">
            <FormGroup>
              <Label>الإسم الكريم</Label>
              <Input
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                  setErrors({ ...errors, name: "" });
                }}
                type="text"
                name="name"
                invalid={errors.name ? true : false}
              />
              {errors.name && <FormFeedback> {errors.name} </FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label>البريد الالكتروني</Label>
              <Input
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                  setErrors({ ...errors, email: "" });
                }}
                type="email"
                name="email"
                invalid={errors.email ? true : false}
              />
              {errors.email && <FormFeedback> {errors.email} </FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label>الرسالة </Label>
              <Input
                onChange={(e) => {
                  setData({ ...data, message: e.target.value });
                  setErrors({ ...errors, message: "" });
                }}
                type="textarea"
                name="description"
                style={{ minHeight: "130px" }}
                invalid={errors.message ? true : false}
              />
              {errors.message && (
                <FormFeedback> {errors.message} </FormFeedback>
              )}
            </FormGroup>

            <FormGroup>
              <Input
                type="submit"
                value="أرسل"
                style={{ background: "#f7b500", color: "#fff" }}
              ></Input>
            </FormGroup>
          </Form>
        </div>
      </Wrapper>
    </div>
  );
};

export default Contactform;
const Wrapper = styled.div`
  .myform {
    margin: 64px auto;
    text-align: center;
    max-width: 380px;
    input,
    textarea {
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
  }
`;
