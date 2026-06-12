import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");
  const totalApplications = applications.length;

  const shortlistedCount = applications.filter(
    (app) => app.status === "Shortlisted"
  ).length;

  const interviewCount = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const selectedCount = applications.filter(
    (app) => app.status === "Selected"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const chartData = [
    { name: "Shortlisted", value: shortlistedCount || 0 },
    { name: "Interview", value: interviewCount || 0 },
    { name: "Selected", value: selectedCount || 0 },
    { name: "Rejected", value: rejectedCount || 0 },
  ];

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/application"
      );
      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/application/${id}`,
        { status }
      );

      alert(res.data.message);
      fetchApplications();
    } catch (error) {
      console.log(error);
      alert("Status Update Failed");
    }
  };

  const exportExcel = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/application/export"
      );

      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert("Export Failed");
    }
  };
  const companies = [
    ...new Set(
      applications.map((app) => app.companyName)
    ),
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2 style={{ color: "#0f172a" }}>
          Application Tracking Dashboard
        </h2>

        <button
          className="btn btn-success"
          onClick={exportExcel}
        >
          📥 Export Excel
        </button>
      </div>
      <div className="row mb-3">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by Email"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={companyFilter}
            onChange={(e) =>
              setCompanyFilter(e.target.value)
            }

          >
            <option value="All">
              All Companies
            </option>

            {companies.map((company) => (
              <option
                key={company}
                value={company}
              >
                {company}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <div className="card bg-primary text-white text-center">
            <div className="card-body">
              <h3>{totalApplications}</h3>
              <p>Total App</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card bg-info text-white text-center">
            <div className="card-body">
              <h3>{shortlistedCount}</h3>
              <p>Shortlisted</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card bg-warning text-dark text-center">
            <div className="card-body">
              <h3>{interviewCount}</h3>
              <p>Interview</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card bg-success text-white text-center">
            <div className="card-body">
              <h3>{selectedCount}</h3>
              <p>Selected</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card bg-danger text-white text-center">
            <div className="card-body">
              <h3>{rejectedCount}</h3>
              <p>Rejected</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="text-center mb-3">
            Application Status Analytics
          </h5>

          <div className="d-flex justify-content-center">
            <PieChart width={450} height={300}>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                <Cell fill="#0dcaf0" />
                <Cell fill="#ffc107" />
                <Cell fill="#198754" />
                <Cell fill="#dc3545" />
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Company</th>
            <th>Role</th>
            <th>Applied Date</th>
            <th>Status</th>
            <th>Resume</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {applications
            .filter(
              (app) =>
                app.studentEmail
                  .toLowerCase()
                  .includes(search.toLowerCase()) &&
                (statusFilter === "All" ||
                  app.status === statusFilter) &&
                (companyFilter === "All" ||
                  app.companyName === companyFilter)
            )
            .sort(
              (a, b) =>
                new Date(b.appliedDate) -
                new Date(a.appliedDate)
            )
            .map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td>{app.studentEmail}</td>
                <td>{app.companyName}</td>
                <td>{app.jobRole}</td>

                <td>
                  {app.appliedDate
                    ? new Date(
                      app.appliedDate
                    ).toLocaleDateString()
                    : "N/A"}
                </td>

                <td>
                  {app.status === "Selected" && (
                    <span className="badge bg-success">
                      Selected
                    </span>
                  )}

                  {app.status === "Rejected" && (
                    <span className="badge bg-danger">
                      Rejected
                    </span>
                  )}

                  {app.status === "Shortlisted" && (
                    <span className="badge bg-info text-dark">
                      Shortlisted
                    </span>
                  )}

                  {app.status === "Interview" && (
                    <span className="badge bg-warning text-dark">
                      Interview
                    </span>
                  )}

                  {app.status === "Applied" && (
                    <span className="badge bg-secondary">
                      Applied
                    </span>
                  )}
                </td>

                <td>
                  <button
                    className="btn btn-primary btn-sm mb-1"
                    onClick={() =>
                      window.open(
                        `http://localhost:5000/api/application/resume/${app.studentEmail}`,
                        "_blank"
                      )
                    }
                  >
                    View
                  </button>

                  <br />

                  <a
                    href={`http://localhost:5000/api/application/resume/${app.studentEmail}`}
                    download
                    className="btn btn-success btn-sm"
                  >
                    Download
                  </a>
                </td>

                <td>
                  <select
                    className="form-select"
                    value={app.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;

                      if (
                        window.confirm(
                          `Change status to ${newStatus}?`
                        )
                      ) {
                        updateStatus(
                          app._id,
                          newStatus
                        );
                      }
                    }}
                  >

                    <option value="Applied">
                      Applied
                    </option>

                    <option value="Shortlisted">
                      Shortlisted
                    </option>

                    <option value="Interview">
                      Interview
                    </option>

                    <option value="Selected">
                      Selected
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>
                  </select>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div >
  );
}

export default Applications;