import { useEffect, useState } from "react";
import axios from "axios";

function AdminApplications() {
  const [applications, setApplications] = useState([]);

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

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await axios.put(
        `http://localhost:5000/api/application/${id}`,
        { status }
      );

      alert("Status Updated");

      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">
          Manage Applications
        </h2>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Email</th>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Resume</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.studentEmail}</td>

                <td>{app.companyName}</td>

                <td>{app.jobRole}</td>

                <td>
                  <select
                    className="form-select"
                    value={app.status}
                    onChange={(e) =>
                      updateStatus(
                        app._id,
                        e.target.value
                      )
                    }
                  >
                    <option>
                      Applied
                    </option>

                    <option>
                      Shortlisted
                    </option>

                    <option>
                      Interview
                    </option>

                    <option>
                      Selected
                    </option>

                    <option>
                      Rejected
                    </option>
                  </select>
                </td>

                <td>
                  <a
                    href={`http://localhost:5000/api/application/resume/${app.studentEmail}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    View Resume
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminApplications;