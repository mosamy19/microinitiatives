import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import { Upload, Modal } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { createInitiative } from "../../../../store/actions/initiative-actions";
import { useEffect } from "react";

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
  };

  const uploadButton = (
    <div>
      <div style={{ padding: "6px 0", color: "rgba(16, 24, 32, 0.65)" }}>
        ارفع صور للمبادرة
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

    dispatch(createInitiative(fd, history));
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
              مبادرة جديدة
            </h2>
            <div className="text-right">
              <FormGroup>
                <Label>
                  عنوان المبادرة <span className="filed">(حقل إلزامي)</span>
                </Label>
                <Input
                  onChange={(e) => {
                    setInitiative({ ...initiative, title: e.target.value });
                    setErrors({ ...errors, title: "" });
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
                  تصنيف المبادرة <span className="filed">(حقل إلزامي)</span>
                </Label>
                <Input
                  onChange={(e) => {
                    setInitiative({ ...initiative, category: e.target.value });
                    setErrors({ ...errors, category: "" });
                  }}
                  type="text"
                  name="category"
                  value={initiative.category}
                  invalid={errors.category ? true : false}
                />
                {errors.category && (
                  <FormFeedback> {errors.category} </FormFeedback>
                )}
              </FormGroup>
              <FormGroup>
                <Label>
                  وصف المبادرة <span className="filed">(حقل إلزامي)</span>
                </Label>
                <Input
                  type="textarea"
                  name="description"
                  onChange={(e) => {
                    setInitiative({
                      ...initiative,
                      description: e.target.value,
                    });
                    setErrors({ ...errors, description: "" });
                  }}
                  style={{ minHeight: "130px" }}
                  value={initiative.description}
                  placeholder="يمكنك شرح المبادرة هنا أو كتابة الأسباب التي دفعتك لإنشاءها أو تجربتك بعد إكمالها. احكي :)"
                  invalid={errors.description ? true : false}
                />
                {errors.description && (
                  <FormFeedback> {errors.description} </FormFeedback>
                )}
              </FormGroup>
              <FormGroup>
                <Label>
                  صور المبادرة <span className="filed">(حقل إلزامي)</span>
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
    .is-invalid {
      border: 1px solid #dc3545;
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
  }
  @media screen and (max-width: 760px) {
    .mb-hide {
      display: none;
    }
  }
`;
