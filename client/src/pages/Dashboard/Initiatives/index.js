import React, { useEffect, useRef } from "react";
import { Table, Space, Button, Input } from "antd";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllInitiativesByAdmin,
  pinInitiative,
  unpinInitiative,
  loveInitiative,
  unloveInitiative,
} from "../../../store/actions/initiative-actions";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import Editinitiatives from "./components/edit-initiatives";
import Deleteinitiative from "./components/delete-initiatives";
import Addinitiative from "./components/add-initiatives";

const Dashboardinitiatives = () => {
  const dispatch = useDispatch();
  let searchInput = useRef();

  const [data, setDatat] = useState([]);
  const [all_initiatives, set_all_initiatives] = useState([]);

  const [searchTerm, setSearchTerm] = useState({
    searchText: "",
    searchedColumn: "",
  });

  // setting the data source
  useEffect(() => {
    dispatch(getAllInitiativesByAdmin());
  }, [dispatch]);

  const { isLoading } = useSelector((state) => state.loader);
  const { initiatives } = useSelector((state) => state.initiatives);
  useEffect(() => {
    if (initiatives) {
      set_all_initiatives(initiatives);
    }
  }, [initiatives]);

  console.log(initiatives);

  useEffect(() => {
    if (all_initiatives.length > 0) {
      let temp = [];
      all_initiatives.map((item, index) => {
        temp = [
          ...temp,
          {
            key: item._id,
            date: moment(item.createdAt).format("l"),
            title: item.title,
            description: item.description,
            clones: item.clones,
            likes: item.likes,
            shares: item.shares,
            saves: item.favorites,
            comments: item.comments,
            type: item.draft === true ? "Draft" : "Published",
            pin: item.pined === true ? "Yes" : "No",
            love: item.loved === true ? "Yes" : "No",
          },
        ];
        return true;
      });
      setDatat([...temp]);
    }
  }, [all_initiatives]);

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
  const [initiativeId, setInitiativeId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const handleOnClick = (id) => {
    setIsOpen(true);
    setInitiativeId(id);
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

  //   columns
  const columns = [
    {
      title: "Created",
      dataIndex: "date",
      key: "date",
      width: 100,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 200,
      ellipsis: true,
      ...getColumnSearchProps("title"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: 450,
      ...getColumnSearchProps("description"),
    },
    {
      title: "Clones",
      dataIndex: "clones",
      key: "clones",
      width: 150,
      filterMultiple: false,
      // onFilter: (value, record) => record.likes.indexOf(value) === 0,
      sorter: (a, b) => a.clones - b.clones,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "likes",
      width: 150,
      filterMultiple: false,
      // onFilter: (value, record) => record.likes.indexOf(value) === 0,
      sorter: (a, b) => a.likes - b.likes,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Share",
      dataIndex: "shares",
      key: "shares",
      width: 150,
      filterMultiple: false,
      // onFilter: (value, record) => record.likes.indexOf(value) === 0,
      sorter: (a, b) => a.shares - b.shares,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Saves",
      dataIndex: "saves",
      key: "saves",
      width: 150,
      filterMultiple: false,
      // onFilter: (value, record) => record.likes.indexOf(value) === 0,
      sorter: (a, b) => a.saves - b.saves,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
      width: 150,
      filterMultiple: false,
      // onFilter: (value, record) => record.likes.indexOf(value) === 0,
      sorter: (a, b) => a.comments - b.comments,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
    },
    {
      title: "Pined",
      dataIndex: "pin",
      key: "pin",
      width: 150,
    },
    {
      title: "Loved",
      dataIndex: "love",
      key: "love",
      width: 150,
    },
    {
      title: "Actions",
      key: "action",
      align: "center",
      width: 500,
      render: (text, record) => (
        <Space size="middle">
          <Button
            className="d-flex justify-content-center align-items-center"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              if (record.pin === "No") {
                dispatch(pinInitiative({ initiativeId: record.key }));
              } else {
                dispatch(unpinInitiative({ initiativeId: record.key }));
              }
              dispatch(getAllInitiativesByAdmin());
            }}
          >
            {record.pin === "No" ? "Pin" : "Unpin"}
          </Button>
          <Button
            className="d-flex justify-content-center align-items-center"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              if (record.love === "No") {
                dispatch(loveInitiative({ initiativeId: record.key }));
              } else {
                dispatch(unloveInitiative({ initiativeId: record.key }));
              }
              dispatch(getAllInitiativesByAdmin());
            }}
          >
            {record.love === "No" ? "Love" : "Unlove"}
          </Button>
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

  const handleOnnChange = (filters, sorter, extra) => {
    console.log("params", filters, sorter, extra);
  };

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
          Add New Initiative
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleOnnChange}
        scroll={{ x: 2500 }}
        sticky
      />
      <Addinitiative
        showModal={handleOnClickAdd}
        handleCancelAdd={handleCancelAdd}
        isOpen={isAddOpen}
      />
      <Editinitiatives
        initiativeId={initiativeId}
        showModal={handleOnClick}
        handleEditCancel={handleCancel}
        isOpen={isOpen}
      />
      <Deleteinitiative
        initiativeId={deleteId}
        showModal={handleOnDelete}
        handleCancel={handleDeleteClose}
        isOpen={isDeleteOpen}
      />
    </Wrapper>
  );
};

export default Dashboardinitiatives;
const Wrapper = styled.div`
  .anticon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
