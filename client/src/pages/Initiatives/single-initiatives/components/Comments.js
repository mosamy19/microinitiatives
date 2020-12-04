import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FormGroup, Input } from "reactstrap";
import commentIcon from "../../../../assets/icons/comments.svg";
import user from "../../../../assets/images/user.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  makeComment,
  getComments,
} from "../../../../store/actions/comment-actions";

const Comments = ({ initiativeId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({
    body: "",
  });

  const [limit, setLimit] = useState(2);

  const [loadedComments, setLoadedComments] = useState([]);
  const [commentCount, setCommetCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getComments(initiativeId));
    }, 200);
  }, [dispatch, initiativeId]);

  const { comments } = useSelector((state) => state.comments);
  useEffect(() => {
    if (comments.length > 0) {
      setCommetCount(comments.length);
      setLoadedComments(comments);
    }
  }, [comments]);

  console.log(loadedComments);

  const addCommentHandler = () => {
    dispatch(makeComment(initiativeId, comment));
    setComment({ body: "" });
    setTimeout(() => {
      dispatch(getComments(initiativeId));
    }, 200);
  };

  const handleOnClick = () => {
    setLimit((prevValue) => prevValue + 2);
  };

  return (
    <Wrapper>
      <div style={{ marginBottom: "35px" }}>
        <Grid container>
          <Grid item xs={12} sm={6} md={4}>
            <div
              className="d-flex align-items-center"
              style={{ margin: "13px 0" }}
            >
              <img src={commentIcon} alt="" />
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  margin: "0 8px",
                }}
              >
                التعليقات
              </p>
              <p
                className="cloneCount"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                ({commentCount})
              </p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <Input
                type="textarea"
                name="comment"
                value={comment.body}
                onChange={(e) =>
                  setComment({ ...comment, body: e.target.value })
                }
                placeholder="قل شيئاً لطيفاً…"
                style={{
                  minHeight: "97px",
                  border: "none",
                  resize: "none",
                  fontSize: "14px",
                  fontWeight: "normal",
                  color: "rgba(0, 0, 0, 0.25)",
                }}
              />
            </FormGroup>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                onClick={addCommentHandler}
                fullWidth
                className="btns"
                style={{ color: "rgba(16, 24, 32, 0.65)" }}
                variant="outlined"
              >
                أضف التعليق
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div style={{ marginBottom: "35px" }}>
        <Grid container spacing={3}>
          {loadedComments.length === 0 ? (
            <span>No Comments Yet!</span>
          ) : (
            loadedComments.slice(0, limit).map((item) => (
              <Grid item xs={12}>
                <div className="d-flex align-items-center mb-flex ">
                  {item.author &&
                    item.author.map((info) => (
                      <div className="d-flex align-items-center ml-3 ">
                        <img
                          src={info.avatar ? info.avatar : user}
                          alt=""
                          width="18px"
                          height="18px"
                          style={{
                            borderRadius: "100%",
                            background: "rgba(0, 0, 0, 0.1)",
                            marginLeft: "5px",
                          }}
                        />
                        <Link
                          to={`/public-profile/${info._id}`}
                          style={{
                            textDecoration: "none",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#6236ff",
                          }}
                        >
                          {info.firstName + " " + info.familyName}
                        </Link>
                      </div>
                    ))}

                  <p
                    className="cloneCount"
                    style={{ fontSize: "14px", fontWeight: "normal" }}
                  >
                    {item.createdAt
                      ? moment(item.createdAt).format("MM-DD-YYYY")
                      : null}
                  </p>
                </div>
                <p>{item.body}</p>
              </Grid>
            ))
          )}
        </Grid>
        {commentCount > limit && (
          <Grid item xs={12} sm={6} md={4}>
            <Button
              onClick={handleOnClick}
              fullWidth
              className="btns"
              style={{
                color: "#3b86fb",
                background: "rgba(59, 134, 251, 0.08)",
                marginTop: "24px",
                border: "none",
              }}
              variant="outlined"
            >
              تحميل المزيد من التعليقات
            </Button>
          </Grid>
        )}
      </div>
    </Wrapper>
  );
};

export default Comments;

const Wrapper = styled.div`
  .btns {
    font-family: inherit;
    outline: none;
    color: rgba(0, 0, 0, 0.25);
    background: #fff;
    border-color: rgba(0, 0, 0, 0.1);
  }
  @media screen and (max-width: 760px) {
    .mb-flex {
      justify-content: space-between;
    }
  }
`;
