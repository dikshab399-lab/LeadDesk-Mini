import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  // Fetch all leads
  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/leads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLeads(response.data.data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch leads");
    }
  };

  // Search leads
  const searchLead = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!keyword.trim()) {
        fetchLeads();
        return;
      }

      const response = await api.get(
        `/leads/search?keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLeads(response.data.data);
    } catch (err) {
      console.log(err);
      setError("Search failed");
    }
  };

  // Update lead status
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/leads/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLeads();
    } catch (err) {
      console.log(err);
      setError("Failed to update status");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <div className="container mt-5">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Admin Dashboard</h2>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>

      {/* Error */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Search */}

      <div className="row mb-4">

        <div className="col-md-8">

          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

        </div>

        <div className="col-md-4">

          <button
            className="btn btn-primary w-100"
            onClick={searchLead}
          >
            Search
          </button>

        </div>

      </div>

      {/* Leads Table */}

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Budget</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {leads.length > 0 ? (

            leads.map((lead) => (

              <tr key={lead._id}>

                <td>{lead.name}</td>

                <td>{lead.email}</td>

                <td>{lead.budget}</td>

                <td>

                  <select
                    className="form-select"
                    value={lead.status}
                    onChange={(e) =>
                      updateStatus(lead._id, e.target.value)
                    }
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>
                  </select>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="4" className="text-center">
                No Leads Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Dashboard;