import { Grid } from "@material-ui/core";
import { Editor, EditorState } from "draft-js";
import { convertToHTML } from 'draft-convert';
import "draft-js/dist/Draft.css";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import { Upload, Modal, Spin } from "antd";
import { Select } from "antd";
import { RiArrowDownSLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import {
  createInitiative,
  createDraftInitiative,
} from "../../../../store/actions/initiative-actions";
import { getAllCategories } from "../../../../store/actions/category-action";
import {
  hideCreateLoading,
  hideDraftLoading,
} from "../../../../store/actions/loading-actions";
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 14, color: "#fff" }} spin />
);
const { Option } = Select;

const Newinitiative = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [initiative, setInitiative] = useState({
    title: "",
    category: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    category: "",
    description: "",
    thumbnail: "",
  });

  

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  // const  [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    // setConvertedContent(currentContentAsHTML);
    setInitiative({
      ...initiative,
      description: currentContentAsHTML,
    });
    setErrors({ ...errors, description: "" });
    dispatch(hideCreateLoading());
  }

  // fetching data for category list
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const { isLoading, draftLoading, createLoading } = useSelector(
    (state) => state.loader
  );
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    if (categories) {
      setCategoryList(categories);
    }
  }, [categories]);

  // Images uploads
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  });

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCancel = () => {
    setState({ ...state, previewVisible: false });
  };

  //Image Preview
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const handleChange = async ({ fileList }) => {
    setState({ ...state, fileList: fileList });
    setErrors({ ...errors, thumbnail: "" });
    dispatch(hideCreateLoading());
  };

  const uploadButton = (
    <div>
      <div style={{ padding: "6px 0", color: "rgba(16, 24, 32, 0.65)" }}>
        ???????? ?????? ????????????????
      </div>
    </div>
  );

  // error handling
  const { error } = useSelector((state) => state.initiatives);
  useEffect(() => {
    if (error) {
      setErrors({
        ...errors,
        title: error.title,
        category: error.category,
        description: error.description,
        thumbnail: error.thumbnail,
      });
    }
  }, [error]);

  // form submition
  const submitHandler = (e) => {
    debugger;
    e.preventDefault();
    let fd = new FormData();
    for (let file of state.fileList) {
      fd.append("thumbnail", file.originFileObj);
    }
    fd.append("title", initiative.title);
    fd.append("category", initiative.category);
    fd.append("description", initiative.description);
    dispatch(createInitiative(fd, history));
  };

  const draftHandler = (e) => {
    e.preventDefault();
    let fd = new FormData();
    for (let file of state.fileList) {
      fd.append("thumbnail", file.originFileObj);
    }
    fd.append("title", initiative.title);
    fd.append("category", initiative.category);
    fd.append("description", initiative.description);
    fd.append("draft", true);

    dispatch(createDraftInitiative(fd, history));
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
                <span> ????????????????</span>
              </Link>
            </div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "rgba(0, 0, 0, 0.85)",
              }}
            >
              ???????????? ??????????
            </h2>
            <div className="text-right">
              <FormGroup>
                <Label>
                  ?????????? ???????????????? <span className="filed">(?????? ????????????)</span>
                </Label>
                <Input
                  onChange={(e) => {
                    setInitiative({ ...initiative, title: e.target.value });
                    setErrors({ ...errors, title: "" });
                    dispatch(hideCreateLoading());
                    dispatch(hideDraftLoading());
                  }}
                  type="text"
                  name="title"
                  value={initiative.title}
                  invalid={errors.title ? true : false}
                />
                {errors.title && <FormFeedback> {errors.title} </FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label>
                  ?????????? ???????????????? <span className="filed">(?????? ????????????)</span>
                </Label>
                <div className="category">
                  <span className="arrow">
                    {errors.category ? (
                      <ExclamationCircleOutlined style={{ color: "#dc3545" }} />
                    ) : (
                      <RiArrowDownSLine />
                    )}
                  </span>
                  <Select
                    bordered={false}
                    style={{
                      width: "100%",
                      textAlign: "right",
                      background: "#fff",
                      borderRadius: "4px",
                    }}
                    onChange={(value) => {
                      setInitiative({
                        ...initiative,
                        category: value,
                      });
                      setErrors({ ...errors, category: "" });
                      dispatch(hideCreateLoading());
                      dispatch(hideDraftLoading());
                    }}
                    dropdownStyle={{
                      textAlign: "right",
                      fontFamily: "inherit",
                      fontSize: "10px",
                      color: "rgba(16,24,32,0.65)",
                    }}
                  >
                    {categoryList.length > 0 &&
                      categoryList.map((item, index) => (
                        <Option value={item._id} key={index}>
                          {item.title}
                        </Option>
                      ))}
                  </Select>
                  {errors.category && (
                    <div style={{ color: "#dc3545", fontSize: "10px" }}>
                      {errors.category}
                    </div>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <Label>
                  ?????? ???????????????? <span className="filed">(?????? ????????????)</span>
                </Label>
                <Editor
                  textAlignment="right"
                  placeholder="?????????? ?????? ???????????????? ?????? ???? ?????????? ?????????????? ???????? ?????????? ???????????????? ???? ???????????? ?????? ??????????????. ???????? :)"
                  editorState={editorState}
                  onChange={handleEditorChange}
                  invalid={errors.description ? true : false}
                />
                {errors.description && (
                  <FormFeedback> {errors.description} </FormFeedback>
                )}
              </FormGroup>
              <FormGroup>
                <Label>
                  ?????? ???????????????? <span className="filed">(?????? ????????????)</span>
                </Label>
                <br />
                <Label>
                  <span style={{ fontSize: "9px", color: "#3b86fb" }}>
                    * ???????????? ?????? ?????????????????? ???????????? ?????? ?????????? ???? ?????? ???????? ????????
                    ???????? ??????????
                  </span>
                </Label>
                <Upload
                  listType="picture-card"
                  fileList={state.fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={() => false}
                >
                  {uploadButton}
                </Upload>
                {errors.thumbnail && (
                  <div style={{ color: "#dc3545", fontSize: "10px" }}>
                    {errors.thumbnail}
                  </div>
                )}
                <Modal
                  visible={state.previewVisible}
                  title={state.previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={state.previewImage}
                  />
                </Modal>
              </FormGroup>
              <FormGroup className="d-flex justify-content-between align-items-center">
                <div style={{ position: "relative", width: "49%" }}>
                  <Input
                    onClick={draftHandler}
                    type="submit"
                    value="?????? ????????????"
                    style={{
                      background: "rgba(0, 0, 0, 0.1)",
                      color: "rgba(0, 0, 0, 0.25)",
                    }}
                    disabled={draftLoading ? true : false}
                  />
                  {draftLoading ? (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "30%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <Spin indicator={antIcon} />
                    </div>
                  ) : null}
                </div>
                <div style={{ position: "relative", width: "49%" }}>
                  <Input
                    onClick={submitHandler}
                    type="submit"
                    value="  ??????"
                    style={{
                      background: "#f7b500",
                      color: "#fff",
                    }}
                    disabled={createLoading ? true : false}
                  />
                  {createLoading ? (
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
    .is-invalid {
      // border: 1px solid #dc3545;
      padding-left: calc(1.5em + 0.75rem);
      background-position: left calc(0.375em + 0.1875rem) center;
    }
    .ant-upload.ant-upload-select-picture-card {
      width: 100%;
      height: 100%;
      margin-right: 0;
    }
    .ant-upload-list-picture-card-container {
      width: 80px;
      height: 80px;
      margin: 0 0 8px 0;
    }
    .category {
      position: relative;
      .ant-select-arrow {
        display: none;
      }
      .ant-select:not(.ant-select-customize-input) .ant-select-selector {
        padding: 4px 12px;
        border: none;
        border-radius: 4px;
        color: rgba(16, 24, 32, 0.65);
      }
      .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        height: auto;
      }
      .ant-select-single.ant-select-show-arrow .ant-select-selection-item,
      .ant-select-single.ant-select-show-arrow
        .ant-select-selection-placeholder {
        padding-right: 0;
      }
      .arrow {
        position: absolute;
        color: rgba(16, 24, 32, 0.65);
        top: 7px;
        left: 12px;
        z-index: 1;
      }
    }
  }
  @media screen and (max-width: 760px) {
    .mb-hide {
      display: none;
    }
  }

  div.DraftEditor-root {
    background-color: white;
  }
  .DraftEditor-editorContainer {
    padding: .375rem .75rem;
  }

  .public-DraftEditorPlaceholder-inner {
    padding: .375rem .75rem;
  }
  
  div.DraftEditor-editorContainer,
  div.public-DraftEditor-content {
    height: 100%;
    min-height: 70px;
  }
`;
