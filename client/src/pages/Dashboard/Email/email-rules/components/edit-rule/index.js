import React from "react";
import { Form, Input, Button, Modal, Select } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getSingleRule,
  getRules,
  editRule,
} from "../../../../../../store/actions/rules-actions";

const Editrule = ({ ruleId, isOpen, handleEditCancel }) => {
  const dispatch = useDispatch();
  const [rule, setRule] = useState({
    activity: "",
    quantity: 0,
    type: "",
    subject: "",
    content: "",
  });

  useEffect(() => {
    dispatch(getSingleRule(ruleId));
  }, [dispatch, ruleId]);

  const { singleRule } = useSelector((state) => state.rules);

  useEffect(() => {
    if (singleRule) {
      setRule({
        ...rule,
        activity: singleRule.activity,
        quantity: singleRule.quantity,
        type: singleRule.type,
        subject: singleRule.subject,
        content: singleRule.content,
      });
    }
  }, [singleRule]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editRule({ ...rule, ruleId }));
    handleEditCancel();
    setTimeout(() => {
      dispatch(getRules());
    }, 300);
  };

  return (
    <div>
      <Modal
        title="Edit Rule"
        visible={isOpen}
        onCancel={handleEditCancel}
        footer={[
          <Button onClick={handleEditCancel}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Update
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
                value={rule.activity}
                onChange={(value) => setRule({ ...rule, activity: value })}
              >
                <Select.Option value="create">Craete</Select.Option>
                <Select.Option value="receive">Receive</Select.Option>
              </Select>

              <Input
                value={rule.quantity}
                type="number"
                onChange={(e) => setRule({ ...rule, quantity: e.target.value })}
                style={{ margin: " 0 10px" }}
              />

              <Select
                value={rule.type}
                onChange={(value) => setRule({ ...rule, type: value })}
              >
                <Select.Option value="initative">Initiative</Select.Option>
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
              value={rule.subject}
              onChange={(e) => setRule({ ...rule, subject: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Email Content">
            <Input.TextArea
              value={rule.content}
              onChange={(e) => setRule({ ...rule, content: e.target.value })}
              style={{ minHeight: "100px" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Editrule;
