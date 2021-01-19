import React from "react";
import { Form, Input, Button, Select } from "antd";
import { Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createRule,
  getRules,
} from "../../../../../../store/actions/rules-actions";

const Addrule = ({ isOpen, handleCancelAdd }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [rules, setRules] = useState({
    activity: "",
    quantity: 0,
    type: "",
    subject: "",
    content: "",
  });

  const submitHandler = () => {
    dispatch(createRule(rules));
    handleCancelAdd();
    setTimeout(() => {
      dispatch(getRules());
    }, 300);
  };

  return (
    <idv>
      <Modal
        title="Add New Rule"
        visible={isOpen}
        onCancel={handleCancelAdd}
        footer={[
          <Button onClick={handleCancelAdd}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={submitHandler}>
            Save
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Email Rule">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ border: "1px solid #d9d9d9", padding: "40px 15px" }}
            >
              <Select
                onChange={(value) => setRules({ ...rules, activity: value })}
              >
                <Select.Option value="create">Craete</Select.Option>
                <Select.Option value="receive">Receive</Select.Option>
              </Select>

              <Input
                type="number"
                onChange={(e) =>
                  setRules({ ...rules, quantity: e.target.value })
                }
                style={{ margin: " 0 10px" }}
              />
              <Select onChange={(value) => setRules({ ...rules, type: value })}>
                <Select.Option value="initiative">Initiative</Select.Option>
                <Select.Option value="clone">Clone</Select.Option>
                <Select.Option value="comment">Comment</Select.Option>
                <Select.Option value="like">Like</Select.Option>
                <Select.Option value="save">Save</Select.Option>
                <Select.Option value="sahre">Sahre</Select.Option>
              </Select>
            </div>
          </Form.Item>
          <Form.Item label="Email Subject">
            <Input
              type="text"
              onChange={(e) => setRules({ ...rules, subject: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Email Content">
            <Input.TextArea
              onChange={(e) => setRules({ ...rules, content: e.target.value })}
              style={{ minHeight: "100px" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </idv>
  );
};

export default Addrule;
