import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Initiativecard from "../../component/Initiativecard";
import samimFont from "../../../../assets/samim-fonts/ArbFONTS-Samim-FD-WOL.ttf";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getMyFavorites } from "../../../../store/actions/favorite-actions";

const Favoriteinitiatives = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [myFavInitiatives, setMyFavInitiatives] = useState([]);

  useEffect(() => {
    dispatch(getMyFavorites());
  }, [dispatch]);

  const { favorites } = useSelector((state) => state.favorites);
  useEffect(() => {
    if (favorites.length > 0) {
      let temp = favorites.map((item) => item.initiative);
      setMyFavInitiatives(temp);
    }
  }, [favorites, user._id]);

  console.log(myFavInitiatives);

  return (
    <Wrapper>
      <Grid container spacing={3}>
        {myFavInitiatives.length > 0 &&
          myFavInitiatives.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <div
                onClick={() => history.push(`/single-initiative/${item.id}`)}
              >
                <Initiativecard initiative={item} />
              </div>
            </Grid>
          ))}
      </Grid>
    </Wrapper>
  );
};

export default Favoriteinitiatives;
const Wrapper = styled.div`
  font-family: Samim-FD-WOL;
  font-size: 18px;
  cursor: pointer;
  @font-face {
    font-family: Samim-FD-WOL;
    src: url(${samimFont});
  }
`;
