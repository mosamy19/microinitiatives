import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input } from "reactstrap";

import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createInitiative } from "../../../../store/actions/initiative-actions";

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
    fontSize: "14px",
    fontWeight: "normal",
    padding: "6px 20px",
    "&:hover": {
      color: "rgba(16, 24, 32, 0.65)",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const Newinitiative = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [initiative, setInitiative] = useState({
    title: "",
    category: [],
    description: "",
    thumbnail: [],
  });

  // const changeHandler = (event) => {
  //   const isFiile = event.target.type === "file";
  //   setInitiative({
  //     ...initiative,
  //     [event.target.name]: isFiile ? event.target.files : event.target.value,
  //   });
  // };
  // console.log(initiative);
  
  const submitHandler = (e) => {
    e.preventDefault();
    let fd = new FormData();
    for (let file of initiative.thumbnail) {
      fd.append("thumbnail", file);
    }
    fd.append("title", initiative.title);
    fd.append("category", initiative.category);
    fd.append("description", initiative.description);

    dispatch(createInitiative(fd, history));
  };
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
        <Form onSubmit={submitHandler} className="text-right">
          <FormGroup>
            <Label>
              عنوان المبادرة <span className="filed">(حقل إلزامي)</span>
            </Label>
            <Input
              onChange={(e) =>
                setInitiative({ ...initiative, title: e.target.value })
              }
              type="text"
              name="title"
            />
          </FormGroup>
          <FormGroup>
            <Label>
              تصنيف المبادرة <span className="filed">(حقل إلزامي)</span>
            </Label>
            <Input
              onChange={(e) =>
                setInitiative({ ...initiative, category: e.target.value })
              }
              type="text"
              name="category"
            />
          </FormGroup>
          <FormGroup>
            <Label>وصف المبادرة </Label>
            <Input
              type="textarea"
              name="description"
              onChange={(e) =>
                setInitiative({ ...initiative, description: e.target.value })
              }
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
              name="thumbnail"
              onChange={(e) =>
                setInitiative({ ...initiative, thumbnail: e.target.files })
              }
            />
            <label style={{ width: "100%" }} htmlFor="contained-button-file">
              <Button
                fullWidth={true}
                variant="outlined"
                component="p"
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

export default Newinitiative;
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
    .filed {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.25);
    }
  }
`;
