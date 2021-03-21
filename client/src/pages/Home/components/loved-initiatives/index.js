import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import LovedInitiativesCard from "../../../../components/loved-initiatives-card";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  btn3: {
    borderColor: "#f7b500",
    color: "#f7b500",
    fontFamily: "inherit",
    fontSize: "16px",
    marginTop: "15px",
    padding: "6px 20px",
    "&:hover": {
      color: "#f7b500",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const LovedInitiatives = ({ initiatives }) => {
  const classes = useStyles();
  const history = useHistory();

  console.log("initiatives", initiatives);
  return (
    <div
      className="container d-flex flex-column align-items-center"
      style={{ margin: "64px auto 90px", padding: "0", width: "100%" }}
    >
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="d-flex flex-column align-items-center"
          style={{ width: "100%" }}
        >
          <LovedInitiativesCard
            bgColor="#f7b500 4%, #f7b500 44%"
            deg="9deg"
            opacity="0.51"
            id={initiatives[0]?._id}
            title={initiatives[0]?.title}
            name={
              initiatives[0]?.author[0].firstName +
              " " +
              initiatives[0]?.author[0].familyName
            }
            img={initiatives[0]?.thumbnail[0]}
          />
          <LovedInitiativesCard
            bgColor="#6236ff 4%, #6236ff 44%"
            deg="9deg"
            opacity="0.53"
            id={initiatives[1]?._id}
            title={initiatives[1]?.title}
            name={
              initiatives[1]?.author[0].firstName +
              " " +
              initiatives[1]?.author[0].familyName
            }
            img={initiatives[1]?.thumbnail[0]}
          />
        </div>
        <div
          className="d-flex flex-column align-items-center"
          style={{ width: "100%" }}
        >
          <LovedInitiativesCard
            bgColor="#c345e6, #dc73ff, #f8ecfc"
            id={initiatives[2]?._id}
            title={initiatives[2]?.title}
            name={
              initiatives[2]?.author[0].firstName +
              " " +
              initiatives[2]?.author[0].familyName
            }
            img={initiatives[2]?.thumbnail[0]}
          />
          <LovedInitiativesCard
            bgColor="#33a9c2, #4fd3f2 72%, #8ddefe"
            opacity="0.62"
            id={initiatives[3]?._id}
            title={initiatives[3]?.title}
            name={
              initiatives[3]?.author[0].firstName +
              " " +
              initiatives[3]?.author[0].familyName
            }
            img={initiatives[3]?.thumbnail[0]}
          />
          <LovedInitiativesCard
            bgColor="#fa6400, #dc73ff, #f7b500"
            id={initiatives[4]?._id}
            title={initiatives[4]?.title}
            name={
              initiatives[4]?.author[0].firstName +
              " " +
              initiatives[4]?.author[0].familyName
            }
            img={initiatives[4]?.thumbnail[0]}
          />
        </div>
      </div>
      <Button
        variant="outlined"
        style={{ margin: "40px 0 0" }}
        className={classes.btn3}
        onClick={() => history.push("/browse-all-initiatives")}
      >
        تصفح كل المبادرات
      </Button>
    </div>
  );
};

export default LovedInitiatives;
