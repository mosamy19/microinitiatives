import React, { useEffect, useState } from "react";
import user from "../../assets/images/user.svg";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import Initiativecard from "../Initiatives/component/Initiativecard";
import { useDispatch, useSelector } from "react-redux";
// import { getPublicProfileUser } from "../../store/actions/auth-actions";
import { getPublicProfileInitiatives } from "../../store/actions/initiative-actions";
import { useHistory, useParams } from "react-router-dom";

const Publicprofile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [publicInitiatives, setPublicInitiatives] = useState([]);

  useEffect(() => {
    dispatch(getPublicProfileInitiatives(id));
  }, [dispatch, id]);

  const { initiatives } = useSelector((state) => state.initiatives);

  useEffect(() => {
    if (initiatives.length > 0) {
      setPublicInitiatives(initiatives);
    }
  }, [initiatives]);

  const author = publicInitiatives.map((item) => item.author);
  const mostClonedInitiatives = publicInitiatives
    .sort((a, b) => b.clones - a.clones)
    .slice(0, 9);

  return (
    <Wrapper>
      {author[0] &&
        author[0].map((item) => (
          <div
            className="d-flex align-items-center"
            style={{ marginBottom: "26px" }}
          >
            <img
              src={item.avatar ? item.avatar : user}
              alt=""
              width="28px"
              height="28px"
              style={{
                borderRadius: "100%",
                background: "rgba(0, 0, 0, 0.1)",
                marginLeft: "5px",
              }}
            />
            <p
              style={{
                marginBottom: "0",
                fontSize: "16px",
                fontWeight: "bold",
                color: "rgba(0, 0, 0, 0.85)",
              }}
            >
              {item.firstName + " " + item.familyName}
            </p>
          </div>
        ))}

      <Grid container spacing={3}>
        {mostClonedInitiatives.length > 0 &&
          mostClonedInitiatives.map((item) => (
            <Grid item xs={12} sm={6} md={4}>
              <div
                onClick={() => history.push(`/single-initiative/${item._id}`)}
              >
                <Initiativecard initiative={item} />
              </div>
            </Grid>
          ))}
      </Grid>
    </Wrapper>
  );
};

export default Publicprofile;
const Wrapper = styled.div`
  margin-top: 41px;
  margin-bottom: 26px;
`;
