import React from "react";
import { Table, Space, Button, Input } from "antd";
import styled from "styled-components";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FileImageOutlined } from "@ant-design/icons";
import moment from "moment";
import { useState } from "react";
import Addrule from "./components/add-rule";
import { getRules } from "../../../../store/actions/rules-actions";
import Editrule from "./components/edit-rule";
import Deleterule from "./components/delete-rule";

const Rules = () => {
  const dispatch = useDispatch();

  const [data, setDatat] = useState([]);
  const [all_rules, set_all_rules] = useState([]);

  // setting the data source
  useEffect(() => {
    dispatch(getRules());
  }, [dispatch]);

  const { isLoading } = useSelector((state) => state.loader);
  const { rules } = useSelector((state) => state.rules);
  console.log(rules);
  useEffect(() => {
    if (rules) {
      set_all_rules(rules);
    }
  }, [rules]);

  useEffect(() => {
    if (all_rules.length > 0) {
      let temp = [];
      all_rules.map((item, index) => {
        temp = [
          ...temp,
          {
            key: item._id,
            date: moment(item.createdAt).format("l"),
            activity: item.activity,
            quantity: item.quantity,
            type: item.type,
            subject: item.subject,
            content: item.content,
          },
        ];
        return true;
      });
      setDatat([...temp]);
    }
  }, [all_rules]);

  // edit user modal props
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [ruleId, setRuleId] = useState("");
  const [ruleDeleteId, setRuleDeleteId] = useState("");

  const handleOnClick = (id) => {
    setIsOpen(true);
    setRuleId(id);
  };
  const handleOnDelete = (id) => {
    setIsDeleteOpen(true);
    setRuleDeleteId(id);
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
      width: 100,
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      width: 100,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 100,
    },
    {
      title: "Email Subject",
      dataIndex: "subject",
      key: "subject",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Email Content",
      dataIndex: "content",
      key: "content",
      width: 300,
      ellipsis: true,
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
      <div className="my-3">
        <Button
          className="d-flex justify-content-center align-items-center"
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={handleOnClickAdd}
        >
          Add New Rule
        </Button>
      </div>
      <Table columns={columns} dataSource={data} scroll={{ x: 1000 }} sticky />
      <Addrule
        // showModal={handleOnClickAdd}
        handleCancelAdd={handleCancelAdd}
        isOpen={isAddOpen}
      />
      <Editrule
        ruleId={ruleId}
        // showModal={handleOnClick}
        handleEditCancel={handleCancel}
        isOpen={isOpen}
      />
      <Deleterule
        ruleId={ruleDeleteId}
        handleCancel={handleDeleteClose}
        isOpen={isDeleteOpen}
      />
    </Wrapper>
  );
};

export default Rules;
const Wrapper = styled.div`
  .anticon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
