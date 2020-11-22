import { IconButton } from "@material-ui/core";
import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import styled from "styled-components";

const Basicinfo = () => {
  return (
    <Wrapper>
      <Form>
        <FormGroup>
          <Label for="exampleEmail">الاسم الأول</Label>
          <Input type="text" name="email" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">اسم العائلة</Label>
          <Input type="text" name="email" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">صورة الحساب </Label> <br />
          <IconButton style={{ outline: "none" }}>
            <AiFillPlusCircle />
          </IconButton>
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

export default Basicinfo;
const Wrapper = styled.div`
  text-align: right;
  input {
    border: none;
    font-size: 14px;
    resize: none;
  }
  label {
    font-size: 14px;
    color: rgba(16, 24, 32, 0.65);
  }
`;
