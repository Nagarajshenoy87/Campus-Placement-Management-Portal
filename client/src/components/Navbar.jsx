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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Placement Portal
        </Link>

        <div className="d-flex gap-3">
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
                className="nav-link text-white"
                to="/dashboard"
              >
                Dashboard
              </Link>

              <Link
                className="nav-link text-white"
                to="/profile"
              >
                Profile
              </Link>

              <Link
                className="nav-link text-white"
                to="/companies"
              >
                Companies
              </Link>

              <Link
                className="nav-link text-white"
                to="/drives"
              >
                Drives
              </Link>

              {!isAdmin && (
                <Link
                  className="nav-link text-white"
                  to="/my-applications"
                >
                  My Applications
                </Link>
              )}

              {isAdmin && (
                <>
                  <Link
                    className="nav-link text-white"
                    to="/applications"
                  >
                    Applications
                  </Link>

                  <Link
                    className="nav-link text-white"
                    to="/add-company"
                  >
                    Add Company
                  </Link>

                  <Link
                    className="nav-link text-white"
                    to="/add-drive"
                  >
                    Add Drive
                  </Link>
                </>
              )}

              <button
                className="btn btn-danger btn-sm"
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