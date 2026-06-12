import { useEffect, useState } from "react";
import axios from "axios";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/company"
      );

      setCompanies(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.companyName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      company.jobRole
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">

      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">
          Companies
        </h1>

        <p className="text-muted">
          Explore available companies and job opportunities.
        </p>
      </div>

      <input
        type="text"
        className="form-control shadow-sm mb-4"
        placeholder="🔍 Search Company or Role..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="card shadow border-0">
        <div className="card-body">

          <table className="table table-hover table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>Company</th>
                <th>Package</th>
                <th>Min CGPA</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <tr key={company._id}>
                    <td>{company.companyName}</td>
                    <td>{company.package} LPA</td>
                    <td>{company.minCGPA}</td>
                    <td>{company.jobRole}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-danger fw-bold"
                  >
                    No Companies Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default Companies;