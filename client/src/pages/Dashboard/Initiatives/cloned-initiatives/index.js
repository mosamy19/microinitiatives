import React, { useEffect, useRef } from "react";
import { Table, Space, Button, Input } from "antd";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInitiativesByAdmin } from "../../../../store/actions/initiative-actions";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const Clonedinitiatives = () => {
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

  const { initiatives } = useSelector((state) => state.initiatives);

  useEffect(() => {
    if (initiatives) {
      set_all_initiatives(initiatives);
    }
  }, [initiatives]);

  let cloned_initiatives =
    all_initiatives.length > 0 &&
    all_initiatives.filter(
      (item) => item.cloned === true && item.based === false
    );

  useEffect(() => {
    if (cloned_initiatives.length > 0) {
      let temp = [];
      cloned_initiatives.map((item, index) => {
        temp = [
          ...temp,
          {
            key: item._id,
            date: moment(item.createdAt).format("l"),
            title: item.title,
            description: item.description,
            author: item.author?.map(
              (name) => `${name.firstName} ${name.familyName}`
            ),
            clones: item.clones,
            likes: item.likes,
            shares: item.shares,
            saves: item.favorites,
            comments: item.comments,
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
      width: 150,
      ellipsis: true,
      ...getColumnSearchProps("title"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: 200,
      ...getColumnSearchProps("description"),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      ellipsis: true,
      width: 100,
      ...getColumnSearchProps("author"),
    },
    {
      title: "Clones",
      dataIndex: "clones",
      key: "clones",
      width: 100,
      filterMultiple: false,
      // onFilter: (value, record) => record.likes.indexOf(value) === 0,
      sorter: (a, b) => a.clones - b.clones,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "likes",
      width: 100,
      filterMultiple: false,
      // onFilter: (value, record) => record.likes.indexOf(value) === 0,
      sorter: (a, b) => a.likes - b.likes,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Share",
      dataIndex: "shares",
      key: "shares",
      width: 100,
      filterMultiple: false,
      // onFilter: (value, record) => record.likes.indexOf(value) === 0,
      sorter: (a, b) => a.shares - b.shares,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Saves",
      dataIndex: "saves",
      key: "saves",
      width: 100,
      filterMultiple: false,
      // onFilter: (value, record) => record.likes.indexOf(value) === 0,
      sorter: (a, b) => a.saves - b.saves,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
      width: 100,
      filterMultiple: false,
      // onFilter: (value, record) => record.likes.indexOf(value) === 0,
      sorter: (a, b) => a.comments - b.comments,
      sortDirections: ["descend", "ascend"],
    },
  ];

  const handleOnnChange = (filters, sorter, extra) => {
    console.log("params", filters, sorter, extra);
  };
  return (
    <Wrapper>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleOnnChange}
        scroll={{ x: 1500 }}
        sticky
      />
    </Wrapper>
  );
};

export default Clonedinitiatives;
const Wrapper = styled.div`
  .anticon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
