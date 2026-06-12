import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [student, setStudent] = useState(null);
  const [resume, setResume] = useState(null);
  const [resumeFile, setResumeFile] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("student")
    );

    setStudent(data);

    if (data) {
      setSkills(data.skills || "");
      fetchResume(data.email);
    }
  }, []);

  const fetchResume = async (email) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/resume/resume/${email}`
      );

      setResumeFile(res.data.resume);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadResume = async () => {
    if (!resume) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("email", student.email);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/resume/upload-resume",
        formData
      );

      alert(res.data.message);

      fetchResume(student.email);
    } catch (error) {
      console.log(error);
      alert("Resume Upload Failed");
    }
  };

  const saveSkills = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/skills",
        {
          email: student.email,
          skills,
        }
      );

      alert(res.data.message);

      const updatedStudent = {
        ...student,
        skills,
      };

      setStudent(updatedStudent);

      localStorage.setItem(
        "student",
        JSON.stringify(updatedStudent)
      );
    } catch (error) {
      console.log(error);
      alert("Skills Update Failed");
    }
  };

  if (!student) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">
          Student Profile
        </h2>

        <h5>Name: {student.name}</h5>
        <h5>Email: {student.email}</h5>
        <h5>Branch: {student.branch}</h5>
        <h5>CGPA: {student.cgpa}</h5>
        <h5>Role: {student.role}</h5>

        <h5>
          Placement Status:{" "}
          <span
            className={`badge ms-2 ${student.placementStatus === "Placed"
              ? "bg-success"
              : "bg-danger"
              }`}
          >
            {student.placementStatus || "Not Placed"}
          </span>
        </h5>

        <hr />

        <h4>Skills</h4>

        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Java, Python, React, Node.js"
          value={skills}
          onChange={(e) =>
            setSkills(e.target.value)
          }
        />

        <button
          className="btn btn-warning mb-4"
          onClick={saveSkills}
        >
          Save Skills
        </button>

        <hr />

        <h4>Upload Resume</h4>

        <input
          type="file"
          className="form-control mb-3"
          accept=".pdf"
          onChange={(e) =>
            setResume(e.target.files[0])
          }
        />

        <button
          className="btn btn-success me-2"
          onClick={uploadResume}
        >
          Upload Resume
        </button>

        {resumeFile && (
          <>
            <a
              href={`http://localhost:5000/uploads/resumes/${resumeFile}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary me-2"
            >
              View Resume
            </a>

            <a
              href={`http://localhost:5000/uploads/resumes/${resumeFile}`}
              download
              className="btn btn-dark"
            >
              Download Resume
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;