import React, { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { Upload, Modal, Select } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  createInitiative,
  createDraftInitiative,
  getSingleInitiatives,
} from "../../../store/actions/initiative-actions";
import {
  hideCreateLoading,
  hideCloneLoading,
} from "../../../store/actions/loading-actions";
import { getAllCategories } from "../../../store/actions/category-action";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Spin, Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 14, color: "#fff" }} spin />
);
const { Option } = Select;

const Newinitiative = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { initiativeId, initiativeAuthor, type } = useParams();

  const [initiative, setInitiative] = useState({
    title: "",
    category: "",
    description: "",
    thumbnail: [],
  });
  const [errors, setErrors] = useState({
    title: "",
    category: "",
    description: "",
    thumbnail: "",
  });

  // fetching data for category list
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    if (categories) {
      setCategoryList(categories);
    }
  }, [categories]);

  // image upload handling
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
        ارفع صور للمبادرة
      </div>
    </div>
  );

  // fetching the single initiative and updating the state
  useEffect(() => {
    dispatch(getSingleInitiatives(initiativeId));
  }, [dispatch, initiativeId]);

  const { isLoading, draftLoading, createLoading } = useSelector(
    (state) => state.loader
  );
  const { singleInitiative } = useSelector((state) => state.initiatives);
  let c = singleInitiative.category;
  useEffect(() => {
    if (singleInitiative) {
      setInitiative({
        ...initiative,
        title: singleInitiative.title,
        category: c && c._id,
        // description: singleInitiative.description,
        // thumbnail: singleInitiative.thumbnail,
      });
    }
  }, [singleInitiative]);

  useEffect(() => {
    if (initiative.thumbnail) {
      let count = -1;
      let arr = [];

      initiative.thumbnail.map((item) => {
        arr = [
          ...arr,
          {
            uid: count--,
            status: "done",
            url: item,
          },
        ];
      });
      setState({
        ...state,
        fileList: [...arr],
      });
    }
  }, [initiative.thumbnail]);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    let fd = new FormData();
    for (let file of state.fileList) {
      if (file.originFileObj) {
        fd.append("thumbnail", file.originFileObj);
      }
      // if (file.url) {
      //   fd.append("thumbnailUri", file.url);
      // }
    }
    fd.append("title", initiative.title);
    fd.append("category", initiative.category);
    fd.append("description", initiative.description);
    fd.append("clonedInitiativeOwner", initiativeAuthor);
    fd.append("clonedInitiativeId", initiativeId);
    fd.append("cloned", true);

    dispatch(createInitiative(fd, history));
  };

  const draftHandler = (e) => {
    e.preventDefault();
    let fd = new FormData();
    for (let file of state.fileList) {
      if (file.originFileObj) {
        fd.append("thumbnail", file.originFileObj);
      }
      // if (file.url) {
      //   fd.append("thumbnailUri", file.url);
      // }
    }
    fd.append("title", initiative.title);
    fd.append("category", initiative.category);
    fd.append("description", initiative.description);
    fd.append("clonedInitiativeOwner", initiativeAuthor);
    fd.append("clonedInitiativeId", initiativeId);
    fd.append("cloned", true);
    fd.append("draft", true);

    dispatch(createDraftInitiative(fd, history));
  };

  return isLoading ? (
    <div style={{ maxWidth: "20px", margin: "0 auto" }}>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  ) : (
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
              تنفيذ المبادرة
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
                  value={initiative.title ? initiative.title : null}
                  disabled
                  invalid={errors.title ? true : false}
                />
                {errors.title && <FormFeedback> {errors.title} </FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label>
                  تصنيف المبادرة <span className="filed">(حقل إلزامي)</span>
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
                    className={type === "clone" ? "dis" : null}
                    onChange={(value) => {
                      setInitiative({
                        ...initiative,
                        category: value,
                      });
                      setErrors({ ...errors, category: "" });
                    }}
                    dropdownStyle={{
                      textAlign: "right",
                      fontFamily: "inherit",
                      fontSize: "10px",
                      color: "rgba(16,24,32,0.65)",
                    }}
                    value={initiative.category}
                    disabled
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
                <Label>وصف المبادرة </Label>
                <Input
                  type="textarea"
                  name="description"
                  onChange={(e) => {
                    setInitiative({
                      ...initiative,
                      description: e.target.value,
                    });
                    setErrors({ ...errors, description: "" });
                    dispatch(hideCreateLoading());
                  }}
                  style={{ minHeight: "130px" }}
                  value={initiative.description ? initiative.description : null}
                  placeholder="يمكنك شرح المبادرة هنا أو كتابة الأسباب التي دفعتك لإنشاءها أو تجربتك بعد إكمالها. احكي :)"
                  invalid={errors.description ? true : false}
                />
                {errors.description && (
                  <FormFeedback> {errors.description} </FormFeedback>
                )}
              </FormGroup>
              <FormGroup>
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
                    value="حفظ كمسودة"
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
                    value="  نشر"
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
    .category {
      position: relative;
      .ant-select-arrow {
        display: none;
      }
      .dis {
        background: #e9ecef !important;
        opacity: 1;
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
`;
