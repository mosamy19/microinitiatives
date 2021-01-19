import React from "react";
import { Form, Input, Button, Select } from "antd";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createCategory,
  getAllCategories,
} from "../../../../../store/actions/category-action";

const Addcategory = ({ isOpen, handleCancelAdd }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [category, setCategory] = useState({
    title: "",
  });

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

  //Image Preview
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

  // form submition
  const submitHandler = (e) => {
    e.preventDefault();
    let fd = new FormData();
    for (let file of state.fileList) {
      fd.append("icon", file.originFileObj);
    }
    fd.append("title", category.title);
    dispatch(createCategory(fd));
    handleCancelAdd();
    setTimeout(() => {
      dispatch(getAllCategories());
    }, 300);
    setCategory({ ...category, title: "" });
    setState({ ...state, fileList: [] });
  };

  return (
    <div>
      <Modal
        title="Add New Category"
        visible={isOpen}
        onCancel={handleCancelAdd}
        footer={[
          <Button onClick={handleCancelAdd}>Cancel</Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={submitHandler}
          >
            Publish
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input
              type="text"
              value={category.title}
              onChange={(e) => {
                setCategory({ ...category, title: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="Category Icon/only png format supports">
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

export default Addcategory;
