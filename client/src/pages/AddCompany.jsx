import { useState } from "react";
import axios from "axios";

function AddCompany() {
  const [companyName, setCompanyName] = useState("");
  const [packageValue, setPackageValue] = useState("");
  const [minCGPA, setMinCGPA] = useState("");
  const [jobRole, setJobRole] = useState("");

  const handleAddCompany = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/company",
        {
          companyName,
          package: packageValue,
          minCGPA,
          jobRole,
        }
      );

      alert(res.data.message);

      setCompanyName("");
      setPackageValue("");
      setMinCGPA("");
      setJobRole("");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to Add Company"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2>Add Company</h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) =>
            setCompanyName(e.target.value)
          }
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Package"
          value={packageValue}
          onChange={(e) =>
            setPackageValue(e.target.value)
          }
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Minimum CGPA"
          value={minCGPA}
          onChange={(e) =>
            setMinCGPA(e.target.value)
          }
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Job Role"
          value={jobRole}
          onChange={(e) =>
            setJobRole(e.target.value)
          }
        />

        <button
          className="btn btn-primary"
          onClick={handleAddCompany}
        >
          Add Company
        </button>
      </div>
    </div>
  );
}

export default AddCompany;