import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    // Client-side validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.budget ||
      !formData.message
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await api.post("/leads", formData);

      setSuccess(response.data.message || "Lead submitted successfully!");

      setFormData({
        name: "",
        email: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="row justify-content-center">

          <div className="col-md-8">

            <div className="card shadow">

              <div className="card-body">

                <h2 className="text-center mb-4">
                  Submit a Lead
                </h2>

                {success && (
                  <div className="alert alert-success">
                    {success}
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label">
                      Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Budget
                    </label>

                    <select
                      className="form-select"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select Budget
                      </option>

                      <option value="₹10,000 - ₹25,000">
                        ₹10,000 - ₹25,000
                      </option>

                      <option value="₹25,000 - ₹50,000">
                        ₹25,000 - ₹50,000
                      </option>

                      <option value="₹50,000+">
                        ₹50,000+
                      </option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Message
                    </label>

                    <textarea
                      rows="5"
                      className="form-control"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    className="btn btn-primary w-100"
                    type="submit"
                  >
                    Submit Lead
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default LeadForm;