import { useEffect, useState } from "react";
import axios from "axios";

function DriveManagement() {
    const [drives, setDrives] = useState([]);
    const [formData, setFormData] = useState({
        companyName: "",
        jobRole: "",
        package: "",
        minCGPA: "",
        deadline: "",
    });
    const [editingId, setEditingId] = useState(null);

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
    const addDrive = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/drive",
                formData
            );

            alert(res.data.message);

            setFormData({
                companyName: "",
                jobRole: "",
                package: "",
                minCGPA: "",
                deadline: "",
            });

            fetchDrives();
        } catch (error) {
            console.log(error);
            alert("Failed to add drive");
        }
    };
    const deleteDrive = async (id) => {
        try {
            if (!window.confirm("Delete this drive?")) {
                return;
            }

            const res = await axios.delete(
                `http://localhost:5000/api/drive/${id}`
            );

            alert(res.data.message);

            fetchDrives();
        } catch (error) {
            console.log(error);
            alert("Delete Failed");
        }
    };
    const updateDrive = async () => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/drive/${editingId}`,
                formData
            );

            alert(res.data.message);

            setFormData({
                companyName: "",
                jobRole: "",
                package: "",
                minCGPA: "",
                deadline: "",
            });

            setEditingId(null);

            fetchDrives();
        } catch (error) {
            console.log(error);
            alert("Update Failed");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">
                Drive Management Dashboard
            </h2>
            <div className="card mb-4">
                <div className="card-body">
                    <h5>Add New Drive</h5>

                    <div className="row g-2">
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Company Name"
                                value={formData.companyName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        companyName: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Job Role"
                                value={formData.jobRole}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        jobRole: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="col-md-2">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Package"
                                value={formData.package}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        package: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="col-md-2">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Min CGPA"
                                value={formData.minCGPA}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        minCGPA: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="col-md-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Deadline"
                                value={formData.deadline}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        deadline: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <button
                        className="btn btn-primary mt-3"
                        onClick={
                            editingId ? updateDrive : addDrive
                        }
                    >
                        {editingId ? "Update Drive" : "Add Drive"}
                    </button>
                </div>
            </div>
            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Company</th>
                        <th>Role</th>
                        <th>Package</th>
                        <th>CGPA</th>
                        <th>Deadline</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {drives.map((drive, index) => (
                        <tr key={drive._id}>
                            <td>{index + 1}</td>
                            <td>{drive.companyName}</td>
                            <td>{drive.jobRole}</td>
                            <td>{drive.package} LPA</td>
                            <td>{drive.minCGPA}</td>
                            <td>{drive.deadline}</td>

                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => {
                                        setEditingId(drive._id);

                                        setFormData({
                                            companyName: drive.companyName,
                                            jobRole: drive.jobRole,
                                            package: drive.package,
                                            minCGPA: drive.minCGPA,
                                            deadline: drive.deadline,
                                        });
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        deleteDrive(drive._id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DriveManagement;