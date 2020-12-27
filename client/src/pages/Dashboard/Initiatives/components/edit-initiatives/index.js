import React from "react";
import { Form, Input, Button, Select } from "antd";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  editInitiativeByAdmin,
  getSingleInitiatives,
  getAllInitiativesByAdmin,
} from "../../../../../store/actions/initiative-actions";
import { getAllCategories } from "../../../../../store/actions/category-action";
import { useEffect } from "react";

const { Option } = Select;
const Editinitiatives = ({ initiativeId, isOpen, handleEditCancel }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [initiative, setInitiative] = useState({
    title: "",
    category: "",
    description: "",
    thumbnail: [],
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

  // fetching the single initiative and updating the state
  useEffect(() => {
    dispatch(getSingleInitiatives(initiativeId));
  }, [dispatch, initiativeId]);

  const { isLoading } = useSelector((state) => state.loader);
  const { singleInitiative } = useSelector((state) => state.initiatives);
  let c = singleInitiative.category;
  useEffect(() => {
    if (singleInitiative) {
      setInitiative({
        ...initiative,
        title: singleInitiative.title,
        category: c && c._id,
        description: singleInitiative.description,
        thumbnail: singleInitiative.thumbnail,
      });
    }
  }, [singleInitiative]);

  useEffect(() => {
    if (initiative.thumbnail) {
      let count = -1;
      let arr = [];
      initiative.thumbnail.map((item) => {
        arr = [
          ...arr,
          {
            uid: count--,
            status: "done",
            url: item,
          },
        ];
      });
      setState({
        ...state,
        fileList: [...arr],
      });
    }
  }, [initiative.thumbnail]);

  // form submition
  const submitHandler = (e) => {
    e.preventDefault();
    let fd = new FormData();
    for (let file of state.fileList) {
      if (file.originFileObj) {
        fd.append("thumbnail", file.originFileObj);
      }
      if (file.url) {
        fd.append("thumbnailUri", file.url);
      }
    }
    fd.append("title", initiative.title);
    fd.append("category", initiative.category);
    fd.append("description", initiative.description);
    fd.append("draft", false);
    dispatch(editInitiativeByAdmin(initiativeId, fd));
    handleEditCancel();
    setTimeout(() => {
      getAllInitiativesByAdmin();
    }, 300);
  };
  return (
    <div>
      <Modal
        title="Edit Initiative"
        visible={isOpen}
        onCancel={handleEditCancel}
        footer={[
          <Button onClick={handleEditCancel}>Cancel</Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={submitHandler}
          >
            Update
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input
              type="text"
              value={initiative.title}
              onChange={(e) => {
                setInitiative({ ...initiative, title: e.target.value });
                console.log(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Category">
            <Select
              value={initiative.category}
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
            <Input.TextArea value={initiative.description} />
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

export default Editinitiatives;
