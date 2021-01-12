import React from "react";
import { Form, Input, Button, Select } from "antd";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createInitiative } from "../../../../../store/actions/initiative-actions";
import { getAllCategories } from "../../../../../store/actions/category-action";
import { useEffect } from "react";

const { Option } = Select;

const Addinitiative = ({ isOpen, handleCancelAdd }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [initiative, setInitiative] = useState({
    title: "",
    category: "",
    description: "",
  });

  // fetching data for category list
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    if (categories) {
      setCategoryList(categories);
    }
  }, [categories]);

  // image upload
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
      fd.append("thumbnail", file.originFileObj);
    }
    fd.append("title", initiative.title);
    fd.append("category", initiative.category);
    fd.append("description", initiative.description);
    dispatch(createInitiative(fd, history));
  };

  const draftHandler = (e) => {
    e.preventDefault();
    let fd = new FormData();
    for (let file of state.fileList) {
      fd.append("thumbnail", file.originFileObj);
    }
    fd.append("title", initiative.title);
    fd.append("category", initiative.category);
    fd.append("description", initiative.description);
    fd.append("draft", true);

    dispatch(createInitiative(fd, history));
  };

  return (
    <div>
      <Modal
        title="Add New Initiative"
        visible={isOpen}
        onCancel={handleCancelAdd}
        footer={[
          <Button onClick={handleCancelAdd}>Cancel</Button>,
          <Button onClick={draftHandler}>Save as draft</Button>,
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
              onChange={(e) => {
                setInitiative({ ...initiative, title: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="Category">
            <Select
              onChange={(value) => {
                setInitiative({ ...initiative, category: value });
                console.log(value);
              }}
            >
              {categoryList.length > 0 &&
                categoryList.map((item, index) => (
                  <Option value={item._id} key={index}>
                    {item.title}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Description"
            onChange={(e) => {
              setInitiative({ ...initiative, description: e.target.value });
              console.log(e.target.value);
            }}
          >
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
    </div>
  );
};

export default Addinitiative;
