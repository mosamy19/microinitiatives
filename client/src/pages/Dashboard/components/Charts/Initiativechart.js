import React from "react";
import ReactApexChart from "react-apexcharts";
import {
  getInitiativesDailyChartData,
  getInitiativesMonthlyChartData,
  getClonedInitiativesDailyChartData,
  getClonedInitiativesMonthlyChartData,
} from "../../../../store/actions/initiative-actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";

const Initiativechart = () => {
  const dispatch = useDispatch();
  const [daily_initiatives, set_daily_initiatives] = useState([]);
  const [monthly_initiatives, set_monthly_initiatives] = useState([]);
  const [daily_cloned_initiatives, set_daily_cloned_initiatives] = useState([]);
  const [monthly_cloned_initiatives, set_monthly_cloned_initiatives] = useState(
    []
  );

  // fetching users data
  useEffect(() => {
    dispatch(getInitiativesDailyChartData());
    dispatch(getInitiativesMonthlyChartData());
    dispatch(getClonedInitiativesDailyChartData());
    dispatch(getClonedInitiativesMonthlyChartData());
  }, [dispatch]);

  const {
    dailyInitiatives,
    monthlyInitiatives,
    dailyClonedInitiatives,
    monthlyClonedInitiatives,
  } = useSelector((state) => state.initiatives);

  useEffect(() => {
    if (dailyInitiatives) {
      set_daily_initiatives(dailyInitiatives);
    }
    if (monthlyInitiatives) {
      set_monthly_initiatives(monthlyInitiatives);
    }
    if (dailyClonedInitiatives) {
      set_daily_cloned_initiatives(dailyClonedInitiatives);
    }
    if (monthlyClonedInitiatives) {
      set_monthly_cloned_initiatives(monthlyClonedInitiatives);
    }
  }, [
    dailyInitiatives,
    monthlyInitiatives,
    dailyClonedInitiatives,
    monthlyClonedInitiatives,
  ]);

  // Daily Initiatives data
  let sortedDailyInitiativesDate = [];
  daily_initiatives.length > 0 &&
    daily_initiatives.map((item, index) =>
      sortedDailyInitiativesDate.push({
        d: new Date(
          moment(
            new Date(`${item._id.month} ${item._id.day} ${item._id.year}`)
          ).format("L")
        ),
        c: item.documentCount,
      })
    );

  sortedDailyInitiativesDate.sort((a, b) => b.d - a.d);
  sortedDailyInitiativesDate.reverse();

  let tempInitiativesCategory = [];
  sortedDailyInitiativesDate.length > 0 &&
    sortedDailyInitiativesDate.map((item) =>
      tempInitiativesCategory.push(moment(item.d).format("D MMM yyyy"))
    );

  tempInitiativesCategory.splice(0, 0, "8 Jan 2021");

  let tempInitiativesData = [];
  sortedDailyInitiativesDate.length > 0 &&
    sortedDailyInitiativesDate.map((item) => tempInitiativesData.push(item.c));

  tempInitiativesData.splice(0, 0, 0);

  // Daily Cloned Initiatives data
  let sortedDailClonedyInitiativesDate = [];
  daily_cloned_initiatives.length > 0 &&
    daily_cloned_initiatives.map((item, index) =>
      sortedDailClonedyInitiativesDate.push({
        d: new Date(
          moment(
            new Date(`${item._id.month} ${item._id.day} ${item._id.year}`)
          ).format("L")
        ),
        c: item.documentCount,
      })
    );

  sortedDailClonedyInitiativesDate.sort((a, b) => b.d - a.d);
  sortedDailClonedyInitiativesDate.reverse();

  let tempClonedInitiativesCategory = [];
  sortedDailClonedyInitiativesDate.length > 0 &&
    sortedDailClonedyInitiativesDate.map((item) =>
      tempClonedInitiativesCategory.push(moment(item.d).format("D MMM yyyy"))
    );

  tempClonedInitiativesCategory.splice(0, 0, "8 Jan 2021");

  let tempClonedInitiativesData = [];
  sortedDailClonedyInitiativesDate.length > 0 &&
    sortedDailClonedyInitiativesDate.map((item) =>
      tempClonedInitiativesData.push(item.c)
    );

  tempClonedInitiativesData.splice(0, 0, 0);

  const state = {
    series: [
      {
        name: "All Initiatives",
        data: tempInitiativesData,
      },
      {
        name: "Cloned Initiatives",
        data: tempClonedInitiativesData,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
      },
      colors: ["#6236ff", "#f7b500"],
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#52a7e0", "#f7b500"],
        },
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "All Initiatives and Cloned Initiatives",
        align: "left",
      },
      subtitle: {
        text: "Counted By Date Time From Our Datebase",
        align: "left",
      },
      xaxis: {
        type: "datetime",
        categories: tempInitiativesCategory,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default Initiativechart;
