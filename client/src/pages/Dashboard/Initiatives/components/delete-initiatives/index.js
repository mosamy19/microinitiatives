import React from "react";
import { Modal, Button } from "antd";
import { useDispatch } from "react-redux";
import {
  deleteInitiativeByAdmin,
  getAllInitiativesByAdmin,
} from "../../../../../store/actions/initiative-actions";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Deleteinitiative = ({ initiativeId, isOpen, handleCancel }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteInitiativeByAdmin(initiativeId));
    handleCancel();
    setTimeout(() => {
      dispatch(getAllInitiativesByAdmin());
    }, 300);
  };

  return (
    <div>
      <Modal
        title="Add New Initiative"
        visible={isOpen}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>No</Button>,
          <Button
            type="primary"
            // loading={loading}
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
            Are you sure, you want to delete this initiative?
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
          When you clicked the OK button, this initiative will be deleted
          permanently from database.
        </p>
      </Modal>
    </div>
  );
};

export default Deleteinitiative;
