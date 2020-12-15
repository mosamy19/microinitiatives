import { Button, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { FormGroup, Label, Input } from "reactstrap";
import { MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  editMyInitiative,
  getSingleInitiatives,
} from "../../../../store/actions/initiative-actions";

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

const Editinitiative = () => {
  const classes = useStyles();
  const { initiativeId, type } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [initiative, setInitiative] = useState({
    title: "",
    category: [],
    description: "",
    thumbnail: [],
  });

  useEffect(() => {
    dispatch(getSingleInitiatives(initiativeId));
  }, [dispatch, initiativeId]);

  const { singleInitiative } = useSelector((state) => state.initiatives);

  useEffect(() => {
    if (singleInitiative) {
      setInitiative({
        ...initiative,
        title: singleInitiative.title,
        category: singleInitiative.category,
        description: singleInitiative.description,
      });
    }
  }, [singleInitiative]);

  const submitHandler = (e) => {
    e.preventDefault();
    let fd = new FormData();
    for (let file of initiative.thumbnail) {
      fd.append("thumbnail", file);
    }
    fd.append("title", initiative.title);
    fd.append("category", initiative.category);
    fd.append("description", initiative.description);

    console.log(fd);

    dispatch(editMyInitiative(initiativeId, fd));
    history.push(`/single-initiative/${initiativeId}`);
    setInitiative({ title: "", category: [], description: "", thumbnail: [] });
  };

  return (
    <Wrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <div className="myform">
            <div
              className="mb-hide"
              style={{
                marginBottom: "18px",
              }}
            >
              <Link
                to="/my-initiatives"
                style={{
                  textDecoration: "none",
                  fontSize: "12px",
                  color: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <MdKeyboardArrowRight />
                <span> مبادراتي</span>
              </Link>
            </div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "rgba(0, 0, 0, 0.85)",
              }}
            >
              {type === "draft" ? (
                <span>نشر المسودة</span>
              ) : (
                <span>تعديل المبادرة</span>
              )}
            </h2>
            <div className="text-right">
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
                  value={initiative.title}
                  disabled={type === "draft" ? false : true}
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
                  value={initiative.category}
                  disabled={type === "draft" ? false : true}
                />
              </FormGroup>
              <FormGroup>
                <Label>وصف المبادرة </Label>
                <Input
                  type="textarea"
                  name="description"
                  onChange={(e) =>
                    setInitiative({
                      ...initiative,
                      description: e.target.value,
                    })
                  }
                  style={{ minHeight: "130px" }}
                  value={initiative.description}
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
                <label
                  style={{ width: "100%" }}
                  htmlFor="contained-button-file"
                >
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
                  onClick={submitHandler}
                  type="submit"
                  value="  نشر"
                  style={{ background: "#f7b500", color: "#fff" }}
                />
              </FormGroup>
            </div>
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Editinitiative;
const Wrapper = styled.div`
  max-width: 460px;
  margin: 0 auto;
  .myform {
    margin: 64px 0;
    text-align: right;
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
  @media screen and (max-width: 760px) {
    .mb-hide {
      display: none;
    }
  }
`;
