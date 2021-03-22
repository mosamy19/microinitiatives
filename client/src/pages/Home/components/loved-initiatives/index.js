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
  console.log("initiatives: ", initiatives);
  return (
    <div
      className="container"
      style={{ margin: "64px auto 90px", padding: "0", maxWidth: "600px", width: "100%" }}
    >
      <div className="row mx-0">
        <div className="col-5 px-0 d-flex flex-column justify-content-center">
           <div className="w-100">
          <LovedInitiativesCard
            gradiant="linear-gradient(9deg, rgba(247, 181, 0, 0.46) 4%, rgba(247, 181, 0, 0.46) 44%)"
            paddingTop="124"
            id={initiatives[0]?._id}
            title={initiatives[0]?.title}
            name={
              initiatives[0]?.author[0].firstName +
              " " +
              initiatives[0]?.author[0].familyName
            }
            img={initiatives[0]?.thumbnail[0]}
          />
          </div>
           <div className="w-100">
          <LovedInitiativesCard
          gradiant="linear-gradient(9deg, rgba(98, 54, 255, 0.46) 4%, rgba(98, 54, 255, 0.46) 44%)"
           paddingTop="124"
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
        </div> 
        <div className="col-7 px-0">
          <div className="w-100">
          <LovedInitiativesCard
          gradiant="linear-gradient(to top, rgba(195, 69, 230, 0.46), rgba(220, 115, 255, 0.46), rgba(248, 236, 252, 0.46))"
            paddingTop="72"
            id={initiatives[2]?._id}
            title={initiatives[2]?.title}
            name={
              initiatives[2]?.author[0].firstName +
              " " +
              initiatives[2]?.author[0].familyName
            }
            img={initiatives[2]?.thumbnail[0]}
            />
            </div>
            <div className="w-100">
          <LovedInitiativesCard
            gradiant="linear-gradient(to top, rgba(51, 169, 194, 0.46), rgb(79, 211, 242, 0.46) 72%, rgb(141, 222, 254, 0.46))"
            paddingTop="72"
            id={initiatives[3]?._id}
            title={initiatives[3]?.title}
            name={
              initiatives[3]?.author[0].firstName +
              " " +
              initiatives[3]?.author[0].familyName
            }
            img={initiatives[3]?.thumbnail[0]}
          />
          </div>
          <div className="w-100">
          <LovedInitiativesCard
          paddingTop="72"
          gradiant="linear-gradient(to top, rgba(250, 100, 0, 0.46), rgba(220, 115, 255, 0.46), rgba(247, 181, 0, 0.46))"
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
      </div>
      <div class="text-center">
      <Button
        variant="outlined"
        style={{ margin: "40px 0 0" }}
        className={classes.btn3}
        onClick={() => history.push("/browse-all-initiatives")}
      >
        تصفح كل المبادرات
      </Button>
      </div> 
    </div>
  );
};

export default LovedInitiatives;
