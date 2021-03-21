import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Spin, Space } from "antd";
import { MdKeyboardArrowRight } from "react-icons/md";

import styled from "styled-components";

import Clonedinitiatives from "./components/Clonedinitiatives";
import Comments from "./components/Comments";
import Cloneinitiative from "./components/Cloneinitiative";
import Imageslider from "./components/Imageslider";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleInitiatives } from "../../../store/actions/initiative-actions";

import Likebutton from "./components/Likebutton";
import Favoritebutton from "./components/Favoritebutton";
import Sharebutton from "./components/Sharebutton";
import Authorinfo from "./components/Authorinfo";
import Cloneinfobtn from "./components/Cloneinfobtn";
import Baseinitiative from "./components/Baseinitiative";

const Singleinitiative = () => {
  const dispatch = useDispatch();
  const { initiativeId } = useParams();

  useEffect(() => {
    dispatch(getSingleInitiatives(initiativeId));
  }, [dispatch, initiativeId]);

  const { isLoading } = useSelector((state) => state.loader);
  const { singleInitiative } = useSelector((state) => state.initiatives);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return isLoading ? (
    <div style={{ maxWidth: "80px", margin: "0 auto" }}>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  ) : (
    <Wrapper>
      <div style={{ maxWidth: "783px", margin: "auto" }}>
        <h2 className="mb-show" style={{ maxWidth: "500px" }}>
          {" "}
          {singleInitiative.title}
        </h2>
        <div className="mb-hide">
          <Link
            to="/all-initiatives"
            style={{
              textDecoration: "none",
              fontSize: "12px",
              color: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <MdKeyboardArrowRight />
            <span>كل المبادرات</span>
          </Link>
        </div>
        <div className="d-flex justify-content-between align-items-center my-3">
          <h2 className="mb-hide" style={{ maxWidth: "500px" }}>
            {singleInitiative.title}{" "}
          </h2>
          <div className="mb-show">
            <Authorinfo
              author={singleInitiative.author}
              date={singleInitiative.createdAt}
            />
          </div>
          <Cloneinfobtn cloneCount={singleInitiative.clones} />
        </div>
        <div style={{ marginBottom: "48px" }}>
          <Imageslider images={singleInitiative.thumbnail} />
        </div>

        <div className="d-flex justify-content-between align-items-center my-3">
          <div className="mb-hide">
            <Authorinfo
              author={singleInitiative.author}
              date={singleInitiative.createdAt}
            />
          </div>
          <div className="cloneCount mb-hide">
            <Likebutton user={user} initiativeId={initiativeId} />
            <Favoritebutton user={user} initiativeId={initiativeId} />
            <Sharebutton
              user={user}
              initiativeId={initiativeId}
              title={singleInitiative.title}
            />
          </div>
        </div>
        <div>
          <div dangerouslySetInnerHTML={{__html: singleInitiative.description ? singleInitiative.description : ''}}></div>
        </div>
        <div className="cloneCount mb-show">
          <div className="d-flex justify-content-between align-items-center  my-3">
            <Likebutton user={user} initiativeId={initiativeId} />
            <Favoritebutton user={user} initiativeId={initiativeId} />
            <Sharebutton
              user={user}
              initiativeId={initiativeId}
              ti={singleInitiative.title}
            />
          </div>
        </div>
        {singleInitiative.cloned !== true && (
          <Cloneinitiative
            initiativeId={singleInitiative._id}
            initiativeAuthor={singleInitiative.author}
            cloneCount={singleInitiative.clones}
          />
        )}

        <Comments user={user} initiativeId={initiativeId} />
        {singleInitiative.cloned === true && (
          <Baseinitiative
            baseInitiativeId={singleInitiative.clonedInitiativeId}
          />
        )}
        <Clonedinitiatives
          baseInitiativeId={
            singleInitiative.cloned === true
              ? singleInitiative.clonedInitiativeId
              : singleInitiative._id
          }
          cloneCount={singleInitiative.clones}
        />
      </div>
    </Wrapper>
  );
};

export default React.memo(Singleinitiative);
const Wrapper = styled.div`
  margin: 64px 0;
  padding-bottom: 10px;
  text-align: right;
  overflow: hidden;
  p {
    min-height: 22px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    color: rgba(16, 24, 32, 0.65);
  }
  h2 {
    font-size: 16px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
  }
  .btns {
    font-family: inherit;
    outline: none;
    color: rgba(0, 0, 0, 0.25);
    background: #fff;
    border-color: rgba(0, 0, 0, 0.1);
    text-align: center;
    div {
      padding-bottom: 2.5px;
    }
  }
  .fv-btn {
    margin: 0 36px;
  }
  .likedStyle {
    color: #e9446b !important;
  }
  .favoriteStyle {
    color: #32c5ff !important;
  }
  .sharedStyle {
    color: #3b86fb !important;
  }
  .mb-show {
    display: none;
  }
  @media screen and (max-width: 760px) {
    .mb-hide {
      display: none;
    }
    .mb-show {
      display: block;
    }
    .fv-btn {
      margin: 0 auto;
    }
  }
`;
