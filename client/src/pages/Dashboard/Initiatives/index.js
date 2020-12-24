import React, { useEffect, useRef } from "react";
import { Table, Space, Button, Input } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInitiatives } from "../../../store/actions/initiative-actions";
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
    dispatch(getAllInitiatives("newest"));
  }, [dispatch]);

  const { isLoading } = useSelector((state) => state.loader);
  const { initiatives } = useSelector((state) => state.initiatives);
  useEffect(() => {
    if (initiatives) {
      set_all_initiatives(initiatives);
    }
  }, [initiatives]);
  console.log(all_initiatives);

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
  const handleOnClick = (id) => {
    setIsOpen(true);
    setInitiativeId(id);
  };
  const handleOnDelete = (id) => {
    setIsDeleteOpen(true);
    setInitiativeId(id);
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
      title: "Creation Date",
      dataIndex: "date",
      key: "date",
      width: "15%",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "12%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "12%",
      ...getColumnSearchProps("description"),
    },
    {
      title: "Clones",
      dataIndex: "clones",
      key: "clones",
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "likes",
    },
    {
      title: "Share",
      dataIndex: "shares",
      key: "shares",
    },
    {
      title: "Saves",
      dataIndex: "saves",
      key: "saves",
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
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
    <div>
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
      <Table columns={columns} dataSource={data} />
      <Addinitiative
        showModal={handleOnClickAdd}
        handleCancel={handleCancelAdd}
        isOpen={isAddOpen}
      />
      <Editinitiatives
        initiativeId={initiativeId}
        showModal={handleOnClick}
        handleCancel={handleCancel}
        isOpen={isOpen}
      />
      <Deleteinitiative
        initiativeId={initiativeId}
        showModal={handleOnDelete}
        handleCancel={handleDeleteClose}
        isOpen={isDeleteOpen}
      />
    </div>
  );
};

export default Dashboardinitiatives;
