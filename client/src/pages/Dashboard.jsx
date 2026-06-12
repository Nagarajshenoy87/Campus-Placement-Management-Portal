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

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      console.log("Dashboard Data:", res.data);

      setData(res.data);
    } catch (error) {
      console.log("Dashboard Error:", error);
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
        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#ffc107",
          "#dc3545",
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
        backgroundColor: [
          "#198754",
          "#dc3545",
          "#0dcaf0",
          "#ffc107",
        ],
      },
    ],
  };

  return (
    <div className="container mt-5">
      <div
        className="text-center text-white p-5 mb-5 shadow"
        style={{
          background:
            "linear-gradient(135deg,#0f172a,#2563eb)",
          borderRadius: "20px",
        }}
      >
        <h1 className="fw-bold mb-3">
          Welcome, {student?.name} 🚀
        </h1>

        <p
          className="mb-0"
          style={{
            fontSize: "18px",
          }}
        >
          Track your applications, explore
          companies, apply for drives and
          manage your placement journey
          successfully.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="card border-0 shadow">
            <div
              className="card-body text-center text-white py-4"
              style={{
                background:
                  "linear-gradient(135deg,#0d6efd,#4dabf7)",
                borderRadius: "12px",
              }}
            >
              <h1 className="display-4 fw-bold">
                {data.totalStudents || 0}
              </h1>
              <h5>Total Students</h5>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="card border-0 shadow">
            <div
              className="card-body text-center text-white py-4"
              style={{
                background:
                  "linear-gradient(135deg,#198754,#20c997)",
                borderRadius: "12px",
              }}
            >
              <h1 className="display-4 fw-bold">
                {data.totalCompanies || 0}
              </h1>
              <h5>Total Companies</h5>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="card border-0 shadow">
            <div
              className="card-body text-center text-dark py-4"
              style={{
                background:
                  "linear-gradient(135deg,#ffc107,#ffda6a)",
                borderRadius: "12px",
              }}
            >
              <h1 className="display-4 fw-bold">
                {data.totalDrives || 0}
              </h1>
              <h5>Total Drives</h5>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="card border-0 shadow">
            <div
              className="card-body text-center text-white py-4"
              style={{
                background:
                  "linear-gradient(135deg,#dc3545,#ff6b6b)",
                borderRadius: "12px",
              }}
            >
              <h1 className="display-4 fw-bold">
                {data.totalApplications || 0}
              </h1>
              <h5>Total Applications</h5>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="card border-0 shadow">
            <div
              className="card-body text-center text-white py-4"
              style={{
                background:
                  "linear-gradient(135deg,#6610f2,#8b5cf6)",
                borderRadius: "12px",
              }}
            >
              <h1 className="display-5 fw-bold">
                {data.highestPackage || 0}
              </h1>

              <h5>Highest Package</h5>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="card border-0 shadow">
            <div
              className="card-body text-center text-white py-4"
              style={{
                background:
                  "linear-gradient(135deg,#fd7e14,#ff922b)",
                borderRadius: "12px",
              }}
            >
              <h1 className="display-5 fw-bold">
                {data.averagePackage || 0}
              </h1>

              <h5>Average Package</h5>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="card border-0 shadow">
            <div
              className="card-body text-center text-white py-4"
              style={{
                background:
                  "linear-gradient(135deg,#6f42c1,#9b59b6)",
                borderRadius: "12px",
              }}
            >
              <h1 className="display-5 fw-bold">
                {data.placementRate || 0}%
              </h1>

              <h5>Placement Rate</h5>
            </div>
          </div>
        </div>

      </div>

      <div className="card mt-5 shadow border-0">
        <div className="card-body">
          <h3 className="text-center mb-4">
            Placement Statistics
          </h3>

          <Bar data={chartData} />
        </div>
      </div>
      <div className="card mt-5 shadow border-0">
        <div className="card-body">
          <h3 className="text-center mb-4">
            Placement Status Analysis
          </h3>

          <div
            style={{
              width: "350px",
              height: "350px",
              margin: "auto",
            }}
          >
            <Pie
              data={placementData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>

      <div className="card mt-5 shadow border-0">
        <div className="card-body">
          <h3 className="text-center mb-4">
            Upcoming Drives
          </h3>

          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Package</th>
                <th>Min CGPA</th>
              </tr>
            </thead>

            <tbody>
              {data.upcomingDrives?.map((drive) => (
                <tr key={drive._id}>
                  <td>{drive.companyName}</td>
                  <td>{drive.jobRole}</td>
                  <td>{drive.package} LPA</td>
                  <td>{drive.minCGPA}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card mt-5 shadow border-0">
        <div className="card-body">
          <h3 className="text-center mb-4">
            Top Students Leaderboard 🏆
          </h3>

          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>CGPA</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {data.topStudents?.map((student, index) => (
                <tr key={student._id}>
                  <td>#{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.cgpa}</td>
                  <td>{student.placementStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;