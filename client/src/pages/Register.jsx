import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");
  const [cgpa, setCgpa] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/register",
        {
          name,
          email,
          password,
          branch,
          cgpa,
        }
      );

      alert(res.data.message);
    } catch (error) {
      alert("Registration Failed");
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">
              Student Registration
            </h2>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter Branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Enter CGPA"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
            />

            <button
              className="btn btn-success w-100"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;