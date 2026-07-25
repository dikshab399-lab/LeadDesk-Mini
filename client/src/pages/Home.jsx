import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6">
              <h1 className="display-4 fw-bold">
                LeadDesk Mini
              </h1>

              <p className="lead mt-3">
                Collect, manage and track customer leads with a simple
                and modern dashboard.
              </p>

              <Link
                to="/lead"
                className="btn btn-primary btn-lg mt-3"
              >
                Submit a Lead
              </Link>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
                alt="Business"
                className="img-fluid rounded shadow"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5">
        <div className="container">

          <h2 className="text-center mb-5">
            Why Choose LeadDesk?
          </h2>

          <div className="row">

            <div className="col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h4>Fast</h4>
                  <p>
                    Submit leads within seconds using a clean interface.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h4>Secure</h4>
                  <p>
                    JWT authentication keeps your admin dashboard protected.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h4>Easy to Manage</h4>
                  <p>
                    Search, update and organize leads from one place.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        © 2026 LeadDesk Mini | Built with React & Node.js
      </footer>
    </>
  );
}

export default Home;