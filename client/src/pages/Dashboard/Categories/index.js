import React from "react";
import { Table, Space, Button, Input } from "antd";
import styled from "styled-components";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategories } from "../../../store/actions/category-action";
import { useState, useRef } from "react";
import { FileImageOutlined } from "@ant-design/icons";
import moment from "moment";
// import Highlighter from "react-highlight-words";
import Deletecategory from "./components/delete-category";
import Editcategory from "./components/edit-category";
import Addcategory from "./components/add-category";

const Categories = () => {
  const dispatch = useDispatch();

  const [data, setDatat] = useState([]);
  const [all_categories, set_all_categories] = useState([]);

  // setting the data source
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const { isLoading } = useSelector((state) => state.loader);
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    if (categories) {
      set_all_categories(categories);
    }
  }, [categories]);

  useEffect(() => {
    if (all_categories.length > 0) {
      let temp = [];
      all_categories.map((item, index) => {
        temp = [
          ...temp,
          {
            key: item._id,
            date: moment(item.createdAt).format("l"),
            title: item.title,
            icon: item.icon,
          },
        ];
        return true;
      });
      setDatat([...temp]);
    }
  }, [all_categories]);

  // edit user modal props
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categoryDeleteId, setCategoryDeleteId] = useState("");

  const handleOnClick = (id) => {
    setIsOpen(true);
    setCategoryId(id);
  };
  const handleOnDelete = (id) => {
    setIsDeleteOpen(true);
    setCategoryDeleteId(id);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
  };

  const handleOnClickAdd = () => {
    setIsAddOpen(true);
  };
  const handleCancelAdd = () => {
    setIsAddOpen(false);
  };
  // columns
  const columns = [
    {
      title: "Created",
      dataIndex: "date",
      key: "date",
      width: "15%",
    },
    {
      title: "Category Title",
      dataIndex: "title",
      key: "title",
      //   width: "12%",
      //   ...getColumnSearchProps("firstName"),
    },
    {
      title: "Category Icon",
      dataIndex: "icon",
      key: "icon",
      render: (text, record) => (
        <img
          src={record.icon ? record.icon : <FileImageOutlined />}
          alt="icon"
          width="25px"
          height="25px"
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            className="d-flex justify-content-center align-items-center"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleOnClick(record.key)}
          >
            Edit
          </Button>
          <Button
            className="d-flex justify-content-center align-items-center"
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleOnDelete(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Wrapper>
      <div className="my-3">
        <Button
          className="d-flex justify-content-center align-items-center"
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={handleOnClickAdd}
        >
          Add New Category
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: "100%", x: "100%" }}
      />
      <Addcategory
        // showModal={handleOnClickAdd}
        handleCancelAdd={handleCancelAdd}
        isOpen={isAddOpen}
      />
      <Editcategory
        categoryId={categoryId}
        // showModal={handleOnClick}
        handleEditCancel={handleCancel}
        isOpen={isOpen}
      />
      <Deletecategory
        categoryId={categoryDeleteId}
        showModal={handleOnDelete}
        handleCancel={handleDeleteClose}
        isOpen={isDeleteOpen}
      />
    </Wrapper>
  );
};

export default Categories;
const Wrapper = styled.div``;
