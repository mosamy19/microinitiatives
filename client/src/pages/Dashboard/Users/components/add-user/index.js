import React from "react";
import styled from "styled-components";
import { Form, Input, Button, Select } from "antd";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addNewUser,
  getAllUsers,
} from "../../../../../store/actions/auth-actions";
const { Option } = Select;

const Adduser = ({ isOpen, handleCancelAdd }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({
    firstName: "",
    familyName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
    fd.append("email", user.email);
    fd.append("password", user.password);
    fd.append("confirmPassword", user.confirmPassword);
    dispatch(addNewUser(fd));

    handleCancelAdd();
    setTimeout(() => {
      dispatch(getAllUsers());
    }, 300);
  };

  return (
    <div>
      <Modal
        title="Add New User"
        visible={isOpen}
        onCancel={handleCancelAdd}
        footer={[
          <Button onClick={handleCancelAdd}>Cancel</Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={handleSubmit}
          >
            Add
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="First Name">
            <Input
              type="text"
              onChange={(e) => {
                setUser({ ...user, firstName: e.target.value });
                console.log(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Family Name">
            <Input
              type="text"
              onChange={(e) => {
                setUser({ ...user, familyName: e.target.value });
                console.log(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              type="email"
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
                console.log(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input
              type="password"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                console.log(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Confirm Password">
            <Input
              type="password"
              onChange={(e) => {
                setUser({ ...user, confirmPassword: e.target.value });
                console.log(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Profile Picture">
            <Upload
              listType="picture-card"
              fileList={state.fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {state.fileList.length >= 1 ? null : uploadButton}
            </Upload>
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
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Adduser;
