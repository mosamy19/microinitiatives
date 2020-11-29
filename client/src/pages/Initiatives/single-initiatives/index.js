import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const Singleinitiative = () => {
  const dispatch = useDispatch();
  const { initiativeId } = useParams();

  useEffect(() => {
    dispatch(getSingleInitiatives(initiativeId));
  }, [dispatch, initiativeId]);

  const { initiatives } = useSelector((state) => state.initiatives);
  const { user } = useSelector((state) => state.auth);

  return (
    <Wrapper>
      <div style={{ maxWidth: "783px", margin: "auto" }}>
        <h2 className="mb-show"> {initiatives.title}</h2>
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
          <h2 className="mb-hide">{initiatives.title} </h2>
          <div className="mb-show">
            <Authorinfo
              author={initiatives.author}
              date={initiatives.createdAt}
            />
          </div>
          <Cloneinfobtn />
        </div>
        <div style={{ marginBottom: "48px" }}>
          <Imageslider images={initiatives.thumbnail} />
        </div>

        <div className="d-flex justify-content-between align-items-center my-3">
          <div className="mb-hide">
            <Authorinfo
              author={initiatives.author}
              date={initiatives.createdAt}
            />
          </div>
          <div className="cloneCount mb-hide">
            <Likebutton user={user} initiativeId={initiativeId} />
            <Favoritebutton user={user} initiativeId={initiativeId} />
            <Sharebutton user={user} initiativeId={initiativeId} />
          </div>
        </div>
        <div>
          <p>
            {initiatives.description
              ? initiatives.description
              : "No description"}
          </p>
        </div>
        <div className="cloneCount mb-show">
          <div className="d-flex justify-content-between my-3">
            <Likebutton user={user} initiativeId={initiativeId} />
            <Favoritebutton user={user} initiativeId={initiativeId} />
            <Sharebutton user={user} initiativeId={initiativeId} />
          </div>
        </div>
        <Cloneinitiative />
        <Comments user={user} initiativeId={initiativeId} />
        <Clonedinitiatives />
      </div>
    </Wrapper>
  );
};

export default React.memo(Singleinitiative);
const Wrapper = styled.div`
  margin: 96px 0;
  text-align: right;
  p {
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
  }
`;
