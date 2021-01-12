import React from "react";
import { Modal, Button } from "antd";
import { useDispatch } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  deleteRule,
  getRules,
} from "../../../../../../store/actions/rules-actions";

const Deleterule = ({ ruleId, isOpen, handleCancel }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteRule(ruleId));
    handleCancel();
    setTimeout(() => {
      dispatch(getRules());
    }, 300);
  };

  return (
    <div>
      <Modal
        title="Delete Rule"
        visible={isOpen}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>No</Button>,
          <Button
            type="primary"
            danger
            onClick={handleDelete}
          >
            Yes
          </Button>,
        ]}
      >
        <div className="d-flex align-items-center">
          <ExclamationCircleOutlined
            className="text-warning"
            style={{ fontSize: "16px", marginRight: "6px" }}
          />
          <h5
            style={{
              marginBottom: "0",
              fontSize: "16px",
              color: "rgba(0, 0, 0, 0.85)",
            }}
          >
            Are you sure, you want to delete this rule?
          </h5>
        </div>
        <p
          style={{
            marginBottom: "0",
            marginTop: "8px",
            paddingLeft: "22px",
            fontSize: "14px",
            color: "rgba(0, 0, 0, 0.85)",
          }}
        >
          When you clicked the OK button, this rule will be deleted
          permanently from database.
        </p>
      </Modal>
    </div>
  );
};

export default Deleterule;
