import React from "react";
import styled from "styled-components";
import { Form, Input, Button, Modal } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getSingleComment,
  editComment,
  getAllComments,
} from "../../../../../store/actions/comment-actions";

const Editcomment = ({ commentId, isOpen, handleEditCancel }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({ body: "" });

  useEffect(() => {
    dispatch(getSingleComment(commentId));
  }, [dispatch, commentId]);

  const { singleComment } = useSelector((state) => state.comments);

  useEffect(() => {
    if (singleComment) {
      setComment({ ...comment, body: singleComment.body });
    }
  }, [singleComment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editComment(commentId, comment));
    handleEditCancel();
    setTimeout(() => {
      dispatch(getAllComments());
    }, 300);
  };

  return (
    <div>
      <Modal
        title="Edit Comment"
        visible={isOpen}
        onCancel={handleEditCancel}
        footer={[
          <Button onClick={handleEditCancel}>Cancel</Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={handleSubmit}
          >
            Update
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item
            label="Comment content"
            onChange={(e) => {
              setComment({ ...comment, body: e.target.value });
            }}
          >
            <Input.TextArea value={comment.body} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Editcomment;
