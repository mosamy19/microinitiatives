import React from "react";
import ReactApexChart from "react-apexcharts";
import {
  getLikesDailyChartData,
  getLikesMonthlyChartData,
} from "../../../../store/actions/likes.actions";
import {
  getFavoritesDailyChartData,
  getFavoritesMonthlyChartData,
} from "../../../../store/actions/favorite-actions";
import {
  getSharesDailyChartData,
  getSharesMonthlyChartData,
} from "../../../../store/actions/share-actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";

const LikeShareSaveLineChart = () => {
  const dispatch = useDispatch();
  const [daily_likes, set_daily_likes] = useState([]);
  const [monthly_likes, set_monthly_likes] = useState([]);
  const [daily_saves, set_daily_saves] = useState([]);
  const [monthly_saves, set_monthly_saves] = useState([]);
  const [daily_shares, set_daily_shares] = useState([]);
  const [monthly_shares, set_monthly_shares] = useState([]);

  // fetching like, save, share data
  useEffect(() => {
    dispatch(getLikesDailyChartData());
    dispatch(getLikesMonthlyChartData());
    dispatch(getFavoritesDailyChartData());
    dispatch(getFavoritesMonthlyChartData());
    dispatch(getSharesDailyChartData());
    dispatch(getSharesMonthlyChartData());
  }, [dispatch]);

  const { dailyLikes, monthlyLikes } = useSelector((state) => state.likes);
  const { dailyFavorites, monthlyFavorites } = useSelector(
    (state) => state.favorites
  );
  const { dailyShares, monthlyShares } = useSelector((state) => state.shares);

  useEffect(() => {
    if (monthlyLikes) {
      set_monthly_likes(monthlyLikes);
    }
    if (monthlyFavorites) {
      set_monthly_saves(monthlyFavorites);
    }
    if (monthlyShares) {
      set_monthly_shares(monthlyShares);
    }
  }, [monthlyLikes, monthlyShares, monthlyFavorites]);

  // Monthly Likes
  let sortedMonthlyLikesDate = [];
  monthly_likes.length > 0 &&
    monthly_likes.map((item, index) =>
      sortedMonthlyLikesDate.push({
        d: new Date(
          moment(new Date(`${item._id.month} 28 ${item._id.year}`)).format("L")
        ),
        c: item.documentCount,
      })
    );

  sortedMonthlyLikesDate.sort((a, b) => b.d - a.d);
  sortedMonthlyLikesDate.reverse();

  let tempLikesMonth = [];
  sortedMonthlyLikesDate.length > 0 &&
    sortedMonthlyLikesDate.map((item) =>
      tempLikesMonth.push(moment(item.d).format("MMM"))
    );

  tempLikesMonth.splice(0, 0, "Dec");
  // console.log("month", tempLikesMonth);

  let tempLikesData = [];
  sortedMonthlyLikesDate.length > 0 &&
    sortedMonthlyLikesDate.map((item) => tempLikesData.push(item.c));

  // tempLikesData.splice(0, 0, 0);
  // console.log("monthly likes", tempLikesData);

  // Monthly Saves
  let sortedMonthlySavesDate = [];
  monthly_saves.length > 0 &&
    monthly_saves.map((item, index) =>
      sortedMonthlySavesDate.push({
        d: new Date(
          moment(new Date(`${item._id.month} 28 ${item._id.year}`)).format("L")
        ),
        c: item.documentCount,
      })
    );

  sortedMonthlySavesDate.sort((a, b) => b.d - a.d);
  sortedMonthlySavesDate.reverse();

  let tempSavesMonth = [];
  sortedMonthlySavesDate.length > 0 &&
    sortedMonthlySavesDate.map((item) =>
      tempSavesMonth.push(moment(item.d).format("MMM"))
    );

  tempSavesMonth.splice(0, 0, "Dec");
  // console.log("month", tempSavesMonth);

  let tempSavesData = [];
  sortedMonthlySavesDate.length > 0 &&
    sortedMonthlySavesDate.map((item) => tempSavesData.push(item.c));

  // tempSavesData.splice(0, 0, 0);
  // console.log("monthly saves", tempSavesData);

  // Monthly Sharers
  let sortedMonthlySharesDate = [];
  monthly_shares.length > 0 &&
    monthly_shares.map((item, index) =>
      sortedMonthlySharesDate.push({
        d: new Date(
          moment(new Date(`${item._id.month} 28 ${item._id.year}`)).format("L")
        ),
        c: item.documentCount,
      })
    );

  sortedMonthlySharesDate.sort((a, b) => b.d - a.d);
  sortedMonthlySharesDate.reverse();

  let tempSharesMonth = [];
  sortedMonthlySharesDate.length > 0 &&
    sortedMonthlySharesDate.map((item) =>
      tempSharesMonth.push(moment(item.d).format("MMM"))
    );

  tempSharesMonth.splice(0, 0, "Dec");
  // console.log("month", tempSharesMonth);

  let tempSharesData = [];
  sortedMonthlySharesDate.length > 0 &&
    sortedMonthlySharesDate.map((item) => tempSharesData.push(item.c));

  // tempSharesData.splice(0, 0, 0);
  // console.log("monthly shares", tempSharesData);

  const state = {
    series: [
      {
        name: "Likes",
        data: tempLikesData,
      },
      {
        name: "Saves",
        data: tempSavesData,
      },
      {
        name: "Shares",
        data: tempSharesData,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      colors: ["#e9446b", "#32c5ff", "#3b86fb"],
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#e9446b", "#32c5ff", "#3b86fb"],
        },
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Likes Saves Shares By Month",
        align: "left",
      },
      subtitle: {
        text: "Counted From Our Datebase",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LikeShareSaveLineChart;
