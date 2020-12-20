import React from "react";
import Chart2 from "../../components/Charts/2";
import Chart9 from "../../components/Charts/9";
import Chart5 from "../../components/Charts/5";
import Chart10 from "../../components/Charts/10";
import Chart1 from "../../components/Charts/1";

const Dashboard = () => {
  return (
    <div>
      <div className="air__utils__heading">
        <h5>Dashboard: Analytics</h5>
      </div>
      <div className="row">
        <div className="col-xl-8 col-lg-6">
          <h5 className="text-dark mb-4">Google Analytics Home</h5>
          <div className="card">
            <Chart2 />
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <Chart9 />
                </div>
              </div>
              <h5 className="text-dark mb-4">How do you acquire users?</h5>
              <div className="card">
                <div className="card-body">
                  <Chart5 />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <Chart10 />
                </div>
              </div>
              <h5 className="text-dark mb-4">
                How are your active users trending over time?
              </h5>
              <div className="card">
                <div className="card-body">
                  <Chart1 />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6">
          <h5 className="text-dark mb-4">Ask analytics Intelligence</h5>
          <div className="card">
            <div className="card-body">{/* <List15 /> */}</div>
          </div>
          <h5 className="text-dark mb-4">What are your top devices?</h5>
          <div className="card">
            <div className="card-body">{/* <List12 /> */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
