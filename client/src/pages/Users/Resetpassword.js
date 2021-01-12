import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../store/actions/auth-actions";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 14, color: "#fff" }} spin />
);

const Resetpassword = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useParams();
  const [data, setData] = useState({ newPassword: "", confirmPassword: "" });
  const [error, setError] = useState({ newPassword: "", confirmPassword: "" });

  const payload = {
    token,
    newPassword: data.newPassword,
    confirmPassword: data.confirmPassword,
  };

  const { isLoading } = useSelector((state) => state.loader);
  const tempError = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (tempError) {
      setError(tempError);
    }
  }, [tempError]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(payload, history));
  };
  return (
    <Wrapper>
      <div className="myform">
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "rgba(0, 0, 0, 0.85)",
            marginBottom: "32px",
          }}
        >
          استعادة كلمة السرّ
        </h2>
        <Form onSubmit={submitHandler} className="text-right">
          <FormGroup>
            <Label> كلمة السرّ الجديدة</Label>
            <Input
              onChange={(e) => {
                setData({ ...data, newPassword: e.target.value });
                setError({ ...error, newPassword: "" });
              }}
              type="password"
              name="newPassword"
              invalid={error.newPassword ? true : false}
            />
            {error.newPassword && (
              <FormFeedback> {error.newPassword} </FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label>تأكيد كلمة السرّ الجديدة </Label>
            <Input
              onChange={(e) => {
                setData({ ...data, confirmPassword: e.target.value });
                setError({ ...error, confirmPassword: "" });
              }}
              type="password"
              name="confirmPassword"
              invalid={error.confirmPassword ? true : false}
            />
            {error.confirmPassword && (
              <FormFeedback> {error.confirmPassword} </FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <div style={{ position: "relative", width: "100%" }}>
              <Input
                type="submit"
                value="حفظ التغييرات"
                style={{ background: "#f7b500", color: "#fff" }}
              ></Input>
              {isLoading ? (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "35%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Spin indicator={antIcon} />
                </div>
              ) : null}
            </div>
          </FormGroup>
        </Form>
        <div>
          <p style={{ fontSize: "14px", color: "rgba(16, 24, 32, 0.65)" }}>
            تريد أن ترجع إلى صفحة الدخول ؟ يمكنك{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              {" "}
              من هنا
            </Link>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Resetpassword;

const Wrapper = styled.div`
  .myform {
    margin: 50px auto;
    text-align: center;
    max-width: 380px;
    input {
      border: none;
      font-size: 14px;
    }
    label {
      font-size: 14px;
      color: rgba(16, 24, 32, 0.65);
    }
    .is-invalid {
      border: 1px solid #dc3545;
      padding-left: calc(1.5em + 0.75rem);
      background-position: left calc(0.375em + 0.1875rem) center;
    }
  }
`;
