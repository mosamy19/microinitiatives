import React from "react";
import { Table, Space, Button, Input } from "antd";
import styled from "styled-components";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllComments } from "../../../store/actions/comment-actions";
import { useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import Highlighter from "react-highlight-words";
import Editcomment from "./components/edit-comment";
import Deletecomment from "./components/delete-comment";

const Dassboardcomment = () => {
  const dispatch = useDispatch();
  let searchInput = useRef();
  const [data, setDatat] = useState([]);
  const [all_comments, set_all_comments] = useState([]);

  const [searchTerm, setSearchTerm] = useState({
    searchText: "",
    searchedColumn: "",
  });

  // setting the data source
  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  const { comments } = useSelector((state) => state.comments);
  useEffect(() => {
    if (comments) {
      set_all_comments(comments);
    }
  }, [comments]);

  useEffect(() => {
    if (all_comments.length > 0) {
      let temp = [];
      all_comments.map((item, index) => {
        temp = [
          ...temp,
          {
            key: item._id,
            date: moment(item.createdAt).format("l"),
            comment: item.body,
            author: item.author[0]
              ? item.author[0].firstName + " " + item.author[0].familyName
              : null,
            initiative: item.initiative?.title,
          },
        ];
        return true;
      });
      setDatat([...temp]);
    }
  }, [all_comments]);

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
  const [commentId, setCommentId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const handleOnClick = (id) => {
    setIsOpen(true);
    setCommentId(id);
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
  // columns
  const columns = [
    {
      title: "Created",
      dataIndex: "date",
      key: "date",
      width: 100,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      width: 300,
      ellipsis: true,
      ...getColumnSearchProps("comment"),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: 200,
      ...getColumnSearchProps("author"),
    },
    {
      title: "Initiative",
      dataIndex: "initiative",
      key: "initiative",
      width: 200,
      ellipsis: true,
      ...getColumnSearchProps("initiative"),
    },
    {
      title: "Action",
      key: "action",
      width: 300,
      align: "center",
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
      <Table columns={columns} dataSource={data} scroll={{ x: 1000 }} sticky />
      <Editcomment
        commentId={commentId}
        handleEditCancel={handleCancel}
        isOpen={isOpen}
      />
      <Deletecomment
        commentId={deleteId}
        handleCancel={handleDeleteClose}
        isOpen={isDeleteOpen}
      />
    </Wrapper>
  );
};

export default Dassboardcomment;
const Wrapper = styled.div`
  .anticon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
