import { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchMyApplications();
  }, []);

  const fetchMyApplications = async () => {
    try {
      const student = JSON.parse(
        localStorage.getItem("student")
      );

      const res = await axios.get(
        "http://localhost:5000/api/application"
      );

      const myApps = res.data.filter(
        (app) =>
          app.studentEmail === student.email
      );

      setApplications(myApps);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Applications</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.companyName}</td>

              <td>{app.jobRole}</td>

              <td>
                <span
                  className={`badge ${
                    app.status === "Selected"
                      ? "bg-success"
                      : app.status === "Rejected"
                      ? "bg-danger"
                      : app.status === "Interview"
                      ? "bg-warning text-dark"
                      : app.status === "Shortlisted"
                      ? "bg-info text-dark"
                      : "bg-primary"
                  }`}
                >
                  {app.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyApplications;