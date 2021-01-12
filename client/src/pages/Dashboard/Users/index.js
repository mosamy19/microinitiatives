import React from "react";
import { Table, Space, Button, Input } from "antd";
import styled from "styled-components";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../../../store/actions/auth-actions";
import { useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import Highlighter from "react-highlight-words";
import Edituser from "./components/edit-user";
import Deleteuser from "./components/delete-user";
import Adduser from "./components/add-user";

const Users = () => {
  const dispatch = useDispatch();
  let searchInput = useRef();

  const [data, setDatat] = useState([]);
  const [all_users, set_all_users] = useState([]);

  const [searchTerm, setSearchTerm] = useState({
    searchText: "",
    searchedColumn: "",
  });

  // setting the data source
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { isLoading } = useSelector((state) => state.loader);
  const { allUsers } = useSelector((state) => state.auth);
  useEffect(() => {
    if (allUsers) {
      set_all_users(allUsers);
    }
  }, [allUsers]);

  useEffect(() => {
    if (all_users.length > 0) {
      let users = [];
      all_users.map((item, index) => {
        users = [
          ...users,
          {
            key: item._id,
            date: moment(item.createdAt).format("l"),
            firstName: item.firstName,
            familyName: item.familyName,
            email: item.email,
            initiatives: item.initiatives.length,
          },
        ];
        return true;
      });
      setDatat([...users]);
    }
  }, [all_users]);

  // filtration
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchTerm.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchTerm.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchTerm({
      ...setSearchTerm,
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchTerm({ ...setSearchTerm, searchText: "" });
  };

  // edit user modal props
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const handleOnClick = (id) => {
    setIsOpen(true);
    setUserId(id);
  };
  const handleOnDelete = (id) => {
    setIsDeleteOpen(true);
    setDeleteId(id);
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
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "12%",
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Family Name",
      dataIndex: "familyName",
      key: "familyName",
      width: "12%",
      ...getColumnSearchProps("familyName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Initiatives",
      dataIndex: "initiatives",
      key: "initiatives",
      // filterMultiple: false,
      // onFilter: (value, record) => record.likes.indexOf(value) === 0,
      sorter: (a, b) => a.initiatives - b.initiatives,
      sortDirections: ["descend", "ascend"],
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
          Add New User
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: "100%", x: "100%" }}
      />
      <Adduser
        // showModal={handleOnClickAdd}
        handleCancelAdd={handleCancelAdd}
        isOpen={isAddOpen}
      />
      <Edituser
        userId={userId}
        showModal={handleOnClick}
        handleEditCancel={handleCancel}
        isOpen={isOpen}
      />
      <Deleteuser
        userId={deleteId}
        showModal={handleOnDelete}
        handleCancel={handleDeleteClose}
        isOpen={isDeleteOpen}
      />
    </Wrapper>
  );
};

export default Users;
const Wrapper = styled.div``;
