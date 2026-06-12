import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  const isAdmin = student?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student");

    alert("Logged Out Successfully");

    navigate("/");
    window.location.reload();
  };

  return (
    <nav
      className="navbar navbar-dark shadow"
      style={{
        background:
          "linear-gradient(90deg,#0f172a,#1e293b)",
      }}
    >
      <div className="container-fluid px-4">
        <Link
          className="navbar-brand fw-bold"
          style={{ fontSize: "1.8rem" }}
          to="/dashboard"
        >
          🎓 Placement Portal
        </Link>

        <div
          className="d-flex align-items-center"
          style={{
            gap: "12px",
            flexWrap: "wrap",
            fontSize: "15px",
          }}
        >
          {!token ? (
            <>
              <Link
                className="nav-link text-white"
                to="/"
              >
                Login
              </Link>

              <Link
                className="nav-link text-white"
                to="/register"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                className="nav-link text-white fw-semibold"
                to="/dashboard"
              >
                Dashboard
              </Link>

              <Link
                className="nav-link text-white fw-semibold"
                to="/profile"
              >
                Profile
              </Link>

              <Link
                className="nav-link text-white fw-semibold"
                to="/companies"
              >
                Companies
              </Link>

              <Link
                className="nav-link text-white fw-semibold"
                to="/drives"
              >
                Drives
              </Link>

              {!isAdmin && (
                <Link
                  className="nav-link text-white fw-semibold"
                  to="/my-applications"
                >
                  My Applications
                </Link>
              )}

              {isAdmin && (
                <>
                  <Link
                    className="nav-link text-white fw-semibold"
                    to="/applications"
                  >
                    Applications
                  </Link>

                  <Link
                    className="nav-link text-white fw-semibold"
                    to="/admin-applications"
                  >
                    Manage Applications
                  </Link>

                  <Link
                    className="nav-link text-white fw-semibold"
                    to="/add-company"
                  >
                    Add Company
                  </Link>

                  <Link
                    className="nav-link text-white fw-semibold"
                    to="/add-drive"
                  >
                    Add Drive
                  </Link>

                  <Link
                    className="nav-link text-white fw-semibold"
                    to="/drive-management"
                  >
                    Manage Drives
                  </Link>
                </>
              )}

              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;