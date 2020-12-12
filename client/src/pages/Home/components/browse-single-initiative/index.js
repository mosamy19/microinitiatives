import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";

import Clonedinitiatives from "./components/Clonedinitiatives";
import Comments from "./components/Comments";
import Cloneinitiative from "./components/Cloneinitiative";
import Imageslider from "./components/Imageslider";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getLandingPageSingleInitiative } from "../../../../store/actions/initiative-actions";

import Likebutton from "./components/Likebutton";
import Favoritebutton from "./components/Favoritebutton";
import Sharebutton from "./components/Sharebutton";
import Authorinfo from "./components/Authorinfo";
import Cloneinfobtn from "./components/Cloneinfobtn";

const Browsesingleinitiative = () => {
  const dispatch = useDispatch();
  const { initiativeId, cloneCount } = useParams();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getLandingPageSingleInitiative(initiativeId));
    }, 200);
  }, [dispatch, initiativeId]);

  const { initiatives } = useSelector((state) => state.initiatives);
  const { user } = useSelector((state) => state.auth);

  return (
    <Wrapper>
      <div style={{ maxWidth: "783px", margin: "auto" }}>
        <h2 className="mb-show"> {initiatives.title}</h2>
        <div className="mb-hide">
          <Link
            to="/browse-all-initiatives"
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
          <Cloneinfobtn cloneCount={cloneCount} />
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
            <Likebutton likes={initiatives.likes} />
            <Favoritebutton favorites={initiatives.favorites} />
            <Sharebutton shares={initiatives.shares} />
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
          <div className="d-flex justify-content-between align-items-center  my-3">
            <Likebutton user={user} initiativeId={initiativeId} />
            <Favoritebutton user={user} initiativeId={initiativeId} />
            <Sharebutton
              user={user}
              initiativeId={initiativeId}
              ti={initiatives.title}
            />
          </div>
        </div>
        {initiatives.cloned !== true && (
          <Cloneinitiative
            initiativeId={initiatives._id}
            title={initiatives.title}
            category={initiatives.category}
            initiativeAuthor={initiatives.author}
            cloneCount={cloneCount}
          />
        )}

        <Comments user={user} initiativeId={initiativeId} />
        <Clonedinitiatives />
      </div>
    </Wrapper>
  );
};

export default Browsesingleinitiative;
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
