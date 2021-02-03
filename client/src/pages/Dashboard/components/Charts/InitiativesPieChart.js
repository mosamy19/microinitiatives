import React from "react";
import ReactApexChart from "react-apexcharts";
import { getAllInitiativesByAdmin } from "../../../../store/actions/initiative-actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const InitiativesPieChart = () => {
  const dispatch = useDispatch();
  const [initiativesCount, setInitiativesCount] = useState(1);
  const [clonedinitiativesCount, setClonedInitiativesCount] = useState(2);
  const [all_initiatives, set_all_initiatives] = useState([]);

  useEffect(() => {
    dispatch(getAllInitiativesByAdmin());
  }, [dispatch]);

  const { initiatives } = useSelector((state) => state.initiatives);
  useEffect(() => {
    if (initiatives) {
      set_all_initiatives(initiatives);
    }
  }, [initiatives]);

  useEffect(() => {
    if (all_initiatives.length > 0) {
      setInitiativesCount(all_initiatives.length);
      let temp = all_initiatives.filter(
        (item) => item.cloned === true && item.based === false
      );
      setClonedInitiativesCount(temp.length);
    }
  }, [all_initiatives]);

  const state = {
    series: [initiativesCount, clonedinitiativesCount],
    options: {
      chart: {
        width: 200,
        type: "donut",
      },
      legend: {
        position: "bottom",
      },
      labels: ["Base Initiatives", "Cloned Initiatives"],
      colors: ["#6236ff", "#f7b500"],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10,
        },
      },
      grid: {
        padding: {
          bottom: -80,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="donut"
      />
    </div>
  );
};

export default InitiativesPieChart;
