import { useState } from "react";
import axios from "axios";

function AddDrive() {
  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [packageValue, setPackageValue] = useState("");
  const [minCGPA, setMinCGPA] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleAddDrive = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/drive",
        {
          companyName,
          jobRole,
          package: packageValue,
          minCGPA,
          deadline,
        }
      );

      alert(res.data.message);

      setCompanyName("");
      setJobRole("");
      setPackageValue("");
      setMinCGPA("");
      setDeadline("");
    } catch (error) {
      alert("Failed to Add Drive");
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-dark text-center mb-4">
          Add Drive
        </h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Job Role"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Package"
          value={packageValue}
          onChange={(e) => setPackageValue(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Minimum CGPA"
          value={minCGPA}
          onChange={(e) => setMinCGPA(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Deadline (DD-MM-YYYY)"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <button
          className="btn btn-success"
          onClick={handleAddDrive}
        >
          Add Drive
        </button>
      </div>
    </div>
  );
}

export default AddDrive;