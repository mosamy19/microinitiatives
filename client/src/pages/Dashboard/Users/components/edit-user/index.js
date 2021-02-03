import React from "react";
import styled from "styled-components";
import { Form, Input, Button, Checkbox } from "antd";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getSingleUser,
  editUserByAdmin,
  getAllUsers,
} from "../../../../../store/actions/auth-actions";
import { useEffect } from "react";

const Edituser = ({ userId, isOpen, handleEditCancel }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({
    firstName: "",
    familyName: "",
    email: "",
    isAdmin: null,
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

  // Fetching single user
  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, [dispatch, userId]);

  const { singleUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (singleUser) {
      setUser({
        ...user,
        firstName: singleUser.firstName,
        familyName: singleUser.familyName,
        email: singleUser.email,
        isAdmin: singleUser.isAdmin,
        avatar: singleUser.avatar,
      });
    }
  }, [singleUser]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let fd = new FormData();
    for (let file of state.fileList) {
      if (file.originFileObj) {
        fd.append("avatar", file.originFileObj);
      }
      if (file.url) {
        fd.append("avatarUri", file.url);
      }
    }
    fd.append("firstName", user.firstName);
    fd.append("familyName", user.familyName);
    fd.append("email", user.email);
    fd.append("isAdmin", user.isAdmin);
    dispatch(editUserByAdmin(fd, userId));
    handleEditCancel();
    setTimeout(() => {
      dispatch(getAllUsers());
    }, 300);
  };

  return (
    <Wrapper>
      <Modal
        title="Edit User"
        visible={isOpen}
        onCancel={handleEditCancel}
        footer={[
          <Button onClick={handleEditCancel}>Cancel</Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={handleSubmit}
          >
            Update
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="First Name">
            <Input
              type="text"
              value={user.firstName}
              onChange={(e) => {
                setUser({ ...user, firstName: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="Family Name">
            <Input
              type="text"
              value={user.familyName}
              onChange={(e) => {
                setUser({ ...user, familyName: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              type="email"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={user.isAdmin}
              onChange={(e) => {
                setUser({ ...user, isAdmin: e.target.checked });
              }}
            >
              isAdmin: {user.isAdmin ? "true" : "false"}
            </Checkbox>
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
    </Wrapper>
  );
};

export default Edituser;
const Wrapper = styled.div``;
