import React from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import {
  getUserChartDataDaily,
  getUserChartDataMonthly,
} from "../../../../store/actions/auth-actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";

const Userchart = () => {
  const dispatch = useDispatch();
  const [daily_users, set_daily_users] = useState([]);
  const [monthly_users, set_monthly_users] = useState([]);

  // fetching users data
  useEffect(() => {
    dispatch(getUserChartDataDaily());
    dispatch(getUserChartDataMonthly());
  }, [dispatch]);

  const { dailyUsers, monthlyUsers } = useSelector((state) => state.auth);

  useEffect(() => {
    if (dailyUsers) {
      set_daily_users(dailyUsers);
    }
    if (monthlyUsers) {
      set_monthly_users(monthlyUsers);
    }
  }, [dailyUsers, monthlyUsers]);

  let sortedDate = [];
  daily_users.length > 0 &&
    daily_users.map((item, index) =>
      sortedDate.push({
        d: new Date(
          moment(
            new Date(`${item._id.month} ${item._id.day} ${item._id.year}`)
          ).format("L")
        ),
        c: item.documentCount,
      })
    );

  sortedDate.sort((a, b) => b.d - a.d);
  sortedDate.reverse();

  let temp = [];
  sortedDate.length > 0 &&
    sortedDate.map((item) =>
      temp.push([moment(item.d).format("D MMM yyyy"), item.c])
    );

  temp.splice(0, 0, ["8 Jan 2021", 0]);

  const series = [
    {
      name: "Users",
      data: temp,
    },
  ];

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
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
    colors: ["#37a000"],
    annotations: {
      yaxis: [
        {
          y: 30,
          borderColor: "#999",
          label: {
            show: true,
            text: "Support",
            style: {
              color: "#fff",
              background: "#00E396",
            },
          },
        },
      ],
      xaxis: [
        {
          // x: new Date("14 Nov 2020").getTime(),
          borderColor: "#999",
          yAxisIndex: 0,
          label: {
            // show: true,
            // text: "Rally",
            style: {
              color: "#fff",
              background: "#775DD0",
            },
          },
        },
      ],
    },
    dataLabels: {
      style: {
        colors: ["#37a000"],
      },
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "All Users",
      align: "left",
    },
    subtitle: {
      text: "Counted By Date Time From Our Datebase",
      align: "left",
    },
    markers: {
      size: 0,
      style: "hollow",
    },
    xaxis: {
      type: "datetime",
      // min: new Date("01 Mar 2012").getTime(),
      // tickAmount: 6,
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    fill: {
      colors: ["#6fda44"],
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  const date = new Date();
  const [selection, setSelection] = useState("one_year");
  const today = moment(new Date()).format("D MMM yyyy");
  const addMonths = (date, months) => {
    date.setMonth(date.getMonth() + months);
    return date;
  };
  const sixMonthsFromToday = moment(addMonths(new Date(), -5)).format(
    "D MMM yyyy"
  );
  const oneYearFromToday = moment(addMonths(new Date(), -11)).format(
    "D MMM yyyy"
  );
  const firstDayOfTheMonth = moment(
    new Date(date.getFullYear(), date.getMonth(), 1)
  ).format("D MMM yyyy");
  const lastDayOfTheMonth = moment(
    new Date(date.getFullYear(), date.getMonth() + 1, 0)
  ).format("D MMM yyyy");

  const updateData = (timeline) => {
    setSelection(timeline);
    switch (timeline) {
      case "one_month":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date(`${firstDayOfTheMonth}`).getTime(),
          new Date(`${lastDayOfTheMonth}`).getTime()
        );
        break;
      case "six_months":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date(`${sixMonthsFromToday}`).getTime(),
          new Date(`${today}`).getTime()
        );
        break;
      case "one_year":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date(`${oneYearFromToday}`).getTime(),
          new Date(`${today}`).getTime()
        );
        break;
      case "all":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("11 Oct 2019").getTime(),
          new Date(`${today}`).getTime()
        );
        break;
      default:
    }
  };

  return (
    <div id="chart">
      <div className="toolbar">
        <button
          id="one_month"
          onClick={() => updateData("one_month")}
          className={selection === "one_month" ? "active" : ""}
        >
          1M
        </button>
        &nbsp;
        <button
          id="six_months"
          onClick={() => updateData("six_months")}
          className={selection === "six_months" ? "active" : ""}
        >
          6M
        </button>
        &nbsp;
        <button
          id="one_year"
          onClick={() => updateData("one_year")}
          className={selection === "one_year" ? "active" : ""}
        >
          1Y
        </button>
        &nbsp;
        <button
          id="all"
          onClick={() => updateData("all")}
          className={selection === "all" ? "active" : ""}
        >
          ALL
        </button>
      </div>

      <div id="chart-timeline">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default Userchart;
