import { Button, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { FormGroup, Label, Input } from "reactstrap";
import { MdKeyboardArrowRight } from "react-icons/md";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  createInitiative,
  getSingleInitiatives,
} from "../../../store/actions/initiative-actions";

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
  const { initiativeId, initiativeAuthor } = useParams();

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(initiative.description);

  const submitHandler = (e) => {
    e.preventDefault();
    let fd = new FormData();
    for (let file of initiative.thumbnail) {
      fd.append("thumbnail", file);
    }
    fd.append("title", initiative.title);
    fd.append("category", initiative.category);
    fd.append("description", initiative.description);
    fd.append("clonedInitiativeOwner", initiativeAuthor);
    fd.append("clonedInitiativeId", initiativeId);
    fd.append("cloned", true);

    dispatch(createInitiative(fd, history));
    // history.push("/all-initiatives");
  };

  const draftHandler = (e) => {
    e.preventDefault();
    let fd = new FormData();
    for (let file of initiative.thumbnail) {
      fd.append("thumbnail", file);
    }
    fd.append("title", initiative.title);
    fd.append("category", initiative.category);
    fd.append("description", initiative.description);
    fd.append("clonedInitiativeOwner", initiativeAuthor);
    fd.append("clonedInitiativeId", initiativeId);
    fd.append("cloned", true);
    fd.append("draft", true);

    dispatch(createInitiative(fd));
    history.push("/my-initiatives");
  };

  return (
    <Wrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <div className="myform">
            <div className="mb-hide" style={{ marginBottom: "18px" }}>
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
              مبادرة جديدة
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
                  value={initiative.title ? initiative.title : null}
                  disabled
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
                  value={initiative.category ? initiative.category : null}
                  disabled
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
                  value={initiative.description ? initiative.description : null}
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
                  onClick={draftHandler}
                  type="submit"
                  value="حفظ كمسودة"
                  style={{
                    background: "rgba(0, 0, 0, 0.1)",
                    color: "rgba(0, 0, 0, 0.25)",
                    width: "49%",
                  }}
                />
                <Input
                  onClick={submitHandler}
                  type="submit"
                  value="  نشر"
                  style={{ background: "#f7b500", color: "#fff", width: "49%" }}
                />
              </FormGroup>
            </div>
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Newinitiative;
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
