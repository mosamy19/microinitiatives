import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input } from "reactstrap";

import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  btn: {
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderStyle: "dashed",
    color: "rgba(16, 24, 32, 0.65)",
    fontFamily: "inherit",
    fontSize: "16px",
    padding: "6px 20px",
    "&:hover": {
      color: "rgba(16, 24, 32, 0.65)",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const CloneOtherInitiative = () => {
  const classes = useStyles();
  return (
    <Wrapper>
      <div className="myform">
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "rgba(0, 0, 0, 0.85)",
          }}
        >
          مبادرة جديدة
        </h2>
        <Form className="text-right">
          <FormGroup>
            <Label>
              عنوان المبادرة <span>(حقل إلزامي)</span>
            </Label>
            <Input
              type="text"
              name="email"
              value="تصوير ٣ فيديوهات ونشرها على يوتيوب "
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label>
              تصنيف المبادرة <span>(حقل إلزامي)</span>
            </Label>
            <Input type="text" name="email" value="تعليمي" disabled />
          </FormGroup>
          <FormGroup>
            <Label>وصف المبادرة </Label>
            <Input
              type="textarea"
              name="text"
              style={{ minHeight: "130px" }}
              placeholder="يمكنك شرح المبادرة هنا أو كتابة الأسباب التي دفعتك لإنشاءها أو تجربتك بعد إكمالها. احكي :)"
            />
          </FormGroup>
          <FormGroup>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label style={{ width: "100%" }} htmlFor="contained-button-file">
              <Button
                fullWidth={true}
                variant="outlined"
                component="span"
                className={classes.btn}
              >
                ارفع صور للمبادرة
              </Button>
            </label>
          </FormGroup>
          <FormGroup className="d-flex justify-content-between align-items-center">
            <Input
              type="submit"
              value="  حفظ كمسودة"
              style={{
                background: "rgba(0, 0, 0, 0.1)",
                color: "rgba(0, 0, 0, 0.25)",
                width: "48%",
              }}
            />
            <Input
              type="submit"
              value="  نشر"
              style={{ background: "#f7b500", color: "#fff", width: "48%" }}
            />
          </FormGroup>
        </Form>
      </div>
    </Wrapper>
  );
};

export default CloneOtherInitiative;
const Wrapper = styled.div`
  .myform {
    margin: 64px auto;
    text-align: center;
    max-width: 460px;
    input,
    textarea {
      border: none;
      font-size: 14px;
      resize: none;
    }
    label {
      font-size: 14px;
      color: rgba(16, 24, 32, 0.65);
    }
    span {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.25);s
    }
  }
`;
