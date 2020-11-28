import { IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import uploadIcon from "../../../assets/icons/Upload_profile_image.svg";
import FileBase64 from "react-file-base64";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../store/actions/auth-actions";

const Basicinfo = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: "",
    familyName: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("firstName", user.firstName);
    fd.append("familyName", user.familyName);
    fd.append("avatar", user.avatar);
    dispatch(updateUser(fd));
    setUser({ firstName: "", familyName: "", avatar: "" });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} enctype="multipart/form-data">
        <FormGroup>
          <Label>الاسم الأول</Label>
          <Input
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            type="text"
            name="firstName"
          />
        </FormGroup>
        <FormGroup>
          <Label>اسم العائلة</Label>
          <Input
            onChange={(e) => setUser({ ...user, familyName: e.target.value })}
            type="text"
            name="familyName"
          />
        </FormGroup>
        <FormGroup>
          <Label> صورة الحساب</Label> <br />
          <Label className="custopm-file-upload-button">
            <Input
              type="file"
              name="avatar"
              onChange={(e) => setUser({ ...user, avatar: e.target.files[0] })}
            />
            <img src={uploadIcon} alt="" />
          </Label>
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
  input[type="file"] {
    display: none;
  }
  .custopm-file-upload-button {
    dispaly: inline-block;
    padding: 6px 10px;
    background: #fff !important;
    border-radius: 50%;
    cursor: pointer;
  }
  .MuiIconButton-root {
    padding: 8px;
  }
`;
