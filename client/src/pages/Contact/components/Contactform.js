import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { useState } from "react";

const Contactform = () => {
  const history = useHistory();

  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState({ name: "", email: "", message: "" });

  const fomrValidation = () => {
    const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (data.name === "") {
      setError({ ...error, name: "هذه الخانة مطلوبة" });
      return false;
    }
    if (data.email === "") {
      setError({ ...error, email: "هذه الخانة مطلوبة" });
      return false;
    } else if (!checkEmail.test(String(data.email).toLowerCase())) {
      setError({ ...error, email: " البريد الإلكتروني الذي أدخلته غير صحيح " });
      return false;
    }
    if (data.message === "") {
      setError({ ...error, message: "هذه الخانة مطلوبة" });
      return false;
    }
    return true;
  };

  const url = "https://hooks.zapier.com/hooks/catch/8429408/oc0uzr4/";
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = fomrValidation();
    if (isValid) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
        body: data,
      })
        .then((res) => res.json())
        .then((params) => console.log(params))
        .catch((err) => console.log(err));
      history.push("/contact/message");
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
                  setError({ ...error, name: "" });
                }}
                type="text"
                name="name"
                invalid={error.name ? true : false}
              />
              {error.name && <FormFeedback> {error.name} </FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label>البريد الالكتروني</Label>
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
              <Label>الرسالة </Label>
              <Input
                onChange={(e) => {
                  setData({ ...data, message: e.target.value });
                  setError({ ...error, message: "" });
                }}
                type="textarea"
                name="description"
                style={{ minHeight: "130px" }}
                invalid={error.message ? true : false}
              />
              {error.message && <FormFeedback> {error.message} </FormFeedback>}
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
