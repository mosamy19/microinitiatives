import React from "react";
import styled from "styled-components";
import { Form, Input, Button, Select } from "antd";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getSingleCategory,
  editCategoryByAdmin,
  getAllCategories,
} from "../../../../../store/actions/category-action";
import { useEffect } from "react";

const Editcategory = ({ categoryId, isOpen, handleEditCancel }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [category, setCategory] = useState({
    title: "",
    icon: "",
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
    dispatch(getSingleCategory(categoryId));
  }, [dispatch, categoryId]);

  const { singleCategory } = useSelector((state) => state.category);

  useEffect(() => {
    if (singleCategory) {
      setCategory({
        ...category,
        title: singleCategory.title,
        icon: singleCategory.icon,
      });
    }
  }, [singleCategory]);

  useEffect(() => {
    if (category.icon) {
      setState({
        ...state,
        fileList: [
          {
            uid: -1,
            status: "done",
            url: category.icon,
          },
        ],
      });
    }
  }, [category.icon]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let fd = new FormData();
    for (let file of state.fileList) {
      if (file.originFileObj) {
        fd.append("icon", file.originFileObj);
      }
      // if (file.url) {
      //   fd.append("avatarUri", file.url);
      // }
    }
    fd.append("title", category.title);
    fd.append("categoryId", categoryId);
    dispatch(editCategoryByAdmin(fd));

    handleEditCancel();
    setTimeout(() => {
      dispatch(getAllCategories());
    }, 300);
  };
  return (
    <div>
      <Modal
        title="Edit Category"
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
          <Form.Item label="Category Title">
            <Input
              type="text"
              value={category.title}
              onChange={(e) => {
                setCategory({ ...category, title: e.target.value });
                console.log(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Category Icon / onlny png format supports">
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

export default Editcategory;
const Wrapper = styled.div``;
