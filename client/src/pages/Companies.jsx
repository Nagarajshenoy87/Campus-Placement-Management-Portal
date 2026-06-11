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
    <div className="container mt-4">
      <h2>Companies</h2>

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
            <th>Package</th>
            <th>Min CGPA</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {filteredCompanies.map((company) => (
            <tr key={company._id}>
              <td>{company.companyName}</td>
              <td>{company.package} LPA</td>
              <td>{company.minCGPA}</td>
              <td>{company.jobRole}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Companies;