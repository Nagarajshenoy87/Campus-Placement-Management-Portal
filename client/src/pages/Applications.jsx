import { useEffect, useState } from "react";
import axios from "axios";

function Applications() {
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Applications Management</h2>

        <button
          className="btn btn-success"
          onClick={exportExcel}
        >
          📥 Export Excel
        </button>
      </div>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Email</th>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.studentEmail}</td>
              <td>{app.companyName}</td>
              <td>{app.jobRole}</td>

              <td>{app.status}</td>

              <td>
                <select
                  className="form-select"
                  onChange={(e) =>
                    updateStatus(
                      app._id,
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Select Status
                  </option>

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
    </div>
  );
}

export default Applications;