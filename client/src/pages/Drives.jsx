import { useEffect, useState } from "react";
import axios from "axios";

function Drives() {
  const [drives, setDrives] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/drive"
      );

      setDrives(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const applyDrive = async (drive) => {
    try {
      const student = JSON.parse(
        localStorage.getItem("student")
      );

      const res = await axios.post(
        "http://localhost:5000/api/application",
        {
          studentEmail: student.email,
          companyName: drive.companyName,
          jobRole: drive.jobRole,
        }
      );

      alert(res.data.message);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Application Failed"
      );
    }
  };

  const filteredDrives = drives.filter(
    (drive) =>
      drive.companyName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      drive.jobRole
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Placement Drives</h2>

      <input
        type="text"
        className="form-control mt-3 mb-3"
        placeholder="Search Company or Role..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Package</th>
            <th>Min CGPA</th>
            <th>Deadline</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredDrives.map((drive) => (
            <tr key={drive._id}>
              <td>{drive.companyName}</td>
              <td>{drive.jobRole}</td>
              <td>{drive.package} LPA</td>
              <td>{drive.minCGPA}</td>
              <td>{drive.deadline}</td>

              <td>
                {new Date() >
                  new Date(
                    drive.deadline.split("-").reverse().join("-")
                  ) ? (
                  <button
                    className="btn btn-secondary"
                    disabled
                  >
                    Expired
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() => applyDrive(drive)}
                  >
                    Apply
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Drives;