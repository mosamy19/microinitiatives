import React from "react";
import ReactApexChart from "react-apexcharts";

const LikeSaveSharePie = ({ likeCount, saveCount, shareCount }) => {
  const state = {
    series: [likeCount, saveCount, shareCount],
    options: {
      chart: {
        width: 200,
        type: "pie",
      },
      legend: {
        position: "bottom",
      },
      labels: ["Likes", "Saves", "Shares"],
      colors: ["#e9446b", "#32c5ff", "#3b86fb"],
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
        type="pie"
        width={380}
      />
    </div>
  );
};

export default LikeSaveSharePie;
