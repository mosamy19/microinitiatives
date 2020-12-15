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
import Baseinitiative from "./components/Baseinitiative";

const Singleinitiative = () => {
  const dispatch = useDispatch();
  const { initiativeId } = useParams();
  const [initiative, setInitiative] = useState([]);

  useEffect(() => {
    dispatch(getSingleInitiatives(initiativeId));
  }, [dispatch, initiativeId]);

  const { singleInitiative } = useSelector((state) => state.initiatives);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (singleInitiative) {
      setInitiative(singleInitiative);
    }
  }, [singleInitiative]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      <div style={{ maxWidth: "783px", margin: "auto" }}>
        <h2 className="mb-show"> {singleInitiative.title}</h2>
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
          <h2 className="mb-hide">{singleInitiative.title} </h2>
          <div className="mb-show">
            <Authorinfo
              author={singleInitiative.author}
              date={singleInitiative.createdAt}
            />
          </div>
          <Cloneinfobtn />
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
          <p>
            {singleInitiative.description ? singleInitiative.description : null}
          </p>
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
          />
        )}

        <Comments user={user} initiativeId={initiativeId} />
        {singleInitiative.cloned === true && (
          <Baseinitiative
            baseInitiativeId={singleInitiative.clonedInitiativeId}
          />
        )}
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
