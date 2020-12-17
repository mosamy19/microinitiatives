import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input } from "reactstrap";

const Contactform = () => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/contact/message");
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
                // onChange={changeHanlder}
                type="text"
                name="name"
                // invalid={error.email ? true : false}
              />
              {/* {error.email && <FormFeedback> {error.email} </FormFeedback>} */}
            </FormGroup>
            <FormGroup>
              <Label>البريد الالكتروني</Label>
              <Input
                // onChange={changeHanlder}
                type="email"
                name="email"
                // invalid={error.email ? true : false}
              />
              {/* {error.email && <FormFeedback> {error.email} </FormFeedback>} */}
            </FormGroup>
            <FormGroup>
              <Label>الرسالة </Label>
              <Input
                type="textarea"
                name="description"
                style={{ minHeight: "130px" }}
              />
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
