import { Button, Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FormGroup, Input } from "reactstrap";
import comments from "../../../../assets/icons/comments.svg";
import user from "../../../../assets/images/user.svg";

const Comments = () => {
  return (
    <Wrapper>
      <div style={{ marginBottom: "35px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <div
              className="d-flex align-items-center"
              style={{ margin: "13px 0" }}
            >
              <img src={comments} alt="" />
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
                (78)
              </p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <Input
                type="textarea"
                name="comment"
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
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              className="btns"
              style={{ color: "rgba(16, 24, 32, 0.65)" }}
              variant="outlined"
            >
              أضف التعليق
            </Button>
          </Grid>
        </Grid>
      </div>
      <div style={{ marginBottom: "35px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className="d-flex align-items-center mb-flex ">
              <div className="d-flex align-items-center ml-3 ">
                <img
                  src={user}
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
                  to="/public-profile"
                  style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#6236ff",
                  }}
                >
                  نورة سعد
                </Link>
              </div>
              <p
                className="cloneCount"
                style={{ fontSize: "14px", fontWeight: "normal" }}
              >
                12-10-202
              </p>
            </div>
            <p>
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
              هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو
              العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها
              التطبيق.
            </p>
          </Grid>
          <Grid item xs={12}>
            <div className="d-flex align-items-center mb-flex ">
              <div className="d-flex align-items-center ml-3 ">
                <img
                  src={user}
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
                  to="/public-profile"
                  style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#6236ff",
                  }}
                >
                  خالد عزيز
                </Link>
              </div>
              <p
                className="cloneCount"
                style={{ fontSize: "14px", fontWeight: "normal" }}
              >
                12-10-202
              </p>
            </div>
            <p>
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
              هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو
              العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها
              التطبيق.
            </p>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
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
        </Grid>
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
