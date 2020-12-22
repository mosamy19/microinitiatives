import React, { useState } from "react";
import { Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { Upload, Modal } from "antd";
import uploadIcon from "../../../assets/icons/Upload_profile_image.svg";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  getLoggedinUser,
} from "../../../store/actions/auth-actions";
import { useEffect } from "react";

const Basicinfo = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    firstName: "",
    familyName: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    familyName: "",
    avatar: "",
  });

  // image upload handling
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  });

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCancel = () => {
    setState({ ...state, previewVisible: false });
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const handleChange = async ({ fileList }) => {
    setState({ ...state, fileList: fileList });
    setErrors({ ...errors, avatar: "" });
  };

  const uploadButton = (
    <div>
      <div style={{ padding: "6px 0", color: "rgba(16, 24, 32, 0.65)" }}>
        <img src={uploadIcon} alt="" />
      </div>
    </div>
  );

  useEffect(() => {
    dispatch(getLoggedinUser());
  }, [dispatch]);

  const { logedinUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (logedinUser) {
      setUser({
        ...user,
        firstName: logedinUser.firstName,
        familyName: logedinUser.familyName,
        avatar: logedinUser.avatar,
      });
    }
  }, [logedinUser]);

  useEffect(() => {
    if (user.avatar) {
      setState({
        ...state,
        fileList: [
          {
            uid: -1,
            status: "done",
            url: user.avatar,
          },
        ],
      });
    }
  }, [user.avatar]);

  // error handling
  const { error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (error) {
      setErrors({
        ...errors,
        firstName: error.firstName,
        familyName: error.familyName,
        avatar: error.avatar,
      });
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let fd = new FormData();
    for (let file of state.fileList) {
      if (file.originFileObj) {
        fd.append("avatar", file.originFileObj);
      }
      // if (file.url) {
      //   fd.append("avatarUri", file.url);
      // }
    }
    fd.append("firstName", user.firstName);
    fd.append("familyName", user.familyName);

    dispatch(updateUser(fd));
    setUser({ firstName: "", familyName: "", avatar: "" });
    setTimeout(() => {
      dispatch(getLoggedinUser());
    }, 300);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} enctype="multipart/form-data">
        <FormGroup>
          <Label>الاسم الأول</Label>
          <Input
            onChange={(e) => {
              setUser({ ...user, firstName: e.target.value });
              setErrors({ ...errors, firstName: "" });
            }}
            type="text"
            name="firstName"
            value={user.firstName ? user.firstName : null}
            invalid={errors.firstName ? true : false}
          />
          {errors.firstName && (
            <FormFeedback> {errors.firstName} </FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label>اسم العائلة</Label>
          <Input
            onChange={(e) => {
              setUser({ ...user, familyName: e.target.value });
              setErrors({ ...errors, familyName: "" });
            }}
            type="text"
            name="familyName"
            value={user.familyName ? user.familyName : null}
            invalid={errors.familyName ? true : false}
          />
          {errors.familyName && (
            <FormFeedback> {errors.familyName} </FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label> صورة الحساب</Label> <br />
          <Upload
            listType="picture-card"
            fileList={state.fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false}
          >
            {state.fileList.length >= 1 ? null : uploadButton}
          </Upload>
          {errors.avatar && (
            <div style={{ color: "#dc3545", fontSize: "10px" }}>
              {errors.avatar}
            </div>
          )}
          <Modal
            visible={state.previewVisible}
            title={state.previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{ width: "100%" }}
              src={state.previewImage}
            />
          </Modal>
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

  .ant-upload.ant-upload-select-picture-card {
    width: 34px;
    height: 34px;
    background-color: #fff;
    border-radius: 50%;
  }
  .MuiIconButton-root {
    padding: 8px;
  }
`;
