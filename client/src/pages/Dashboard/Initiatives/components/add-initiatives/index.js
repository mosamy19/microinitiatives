import React from "react";
import styled from "styled-components";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Form, Input, Button, Select } from "antd";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Option } = Select;

const Addinitiative = ({ isOpen, handleCancelAdd }) => {
  const [initiative, setInitiative] = useState({
    title: "",
    category: "",
    description: "",
  });
  const handleOnSelectChange = (value) => {
    console.log(value);
  };
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
  return (
    <div className="">
      <Modal
        title="Add New Initiative"
        visible={isOpen}
        onCancel={handleCancelAdd}
        footer={[
          <Button key="back" onClick={handleCancelAdd}>
            Cancel
          </Button>,
          <Button key="back" onClick={handleCancelAdd}>
            Save as draft
          </Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            // onClick={this.handleOk}
          >
            Publish
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input
              type="text"
              onChange={(e) => {
                setInitiative({ ...initiative, title: e.target.value });
                console.log(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <div>
              <Select>
                <Option value="newest">الأحدث</Option>
                <Option value="cloned">أكثر المبادرات تنفيذاً</Option>
                <Option value="liked">أكثر المبادرات إعجابًا</Option>
              </Select>
            </div>
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Images">
            <Upload
              listType="picture-card"
              fileList={state.fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {uploadButton}
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
      {/* <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={isOpen}
        onClose={handleCancelAdd}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Initiative</DialogTitle>
        <DialogContent>
         
        </DialogContent>
        <DialogActions style={{ marginBottom: "15px", marginRight: "15px" }}>
          <Button onClick={handleCancel} type="primary" danger>
            Cancel
          </Button>
          <Button onClick={handleCancel}>Save as draft</Button>
          <Button onClick={handleCancel} type="primary">
            Publish
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default Addinitiative;
