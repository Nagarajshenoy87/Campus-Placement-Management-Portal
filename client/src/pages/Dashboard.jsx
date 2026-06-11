import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const chartData = {
    labels: [
      "Students",
      "Companies",
      "Drives",
      "Applications",
    ],
    datasets: [
      {
        label: "Portal Statistics",
        data: [
          data.totalStudents || 0,
          data.totalCompanies || 0,
          data.totalDrives || 0,
          data.totalApplications || 0,
        ],
      },
    ],
  };

  const placementData = {
    labels: [
      "Selected",
      "Rejected",
      "Shortlisted",
      "Interview",
    ],
    datasets: [
      {
        data: [
          data.selectedStudents || 0,
          data.rejectedStudents || 0,
          data.shortlistedStudents || 0,
          data.interviewStudents || 0,
        ],
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        Placement Portal Dashboard
      </h2>

      <div className="row g-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary shadow">
            <div className="card-body text-center">
              <h1>{data.totalStudents || 0}</h1>
              <h5>Total Students</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-success shadow">
            <div className="card-body text-center">
              <h1>{data.totalCompanies || 0}</h1>
              <h5>Total Companies</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-warning shadow">
            <div className="card-body text-center">
              <h1>{data.totalDrives || 0}</h1>
              <h5>Total Drives</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-danger shadow">
            <div className="card-body text-center">
              <h1>{data.totalApplications || 0}</h1>
              <h5>Total Applications</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-5 shadow">
        <div className="card-body">
          <h4 className="mb-4">
            Placement Statistics
          </h4>

          <Bar data={chartData} />

          <div className="mt-5">
            <h4>Placement Status</h4>

            <Pie data={placementData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;