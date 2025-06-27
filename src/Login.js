import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ updateUserDetails }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validate = () => {
    let isValid = true;
    if (!formData.username || !formData.password) {
      setMessage("Username and Password are required.");
      isValid = false;
    } else {
      setMessage('');
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const body = {
        username: formData.username,
        password: formData.password
      };

      const config = { withCredentials: true };

      try {
        const response = await axios.post(
          'http://localhost:5002/auth/login',
          body,
          config
        );

        updateUserDetails(response.data.user);
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
        setErrors({ message: "Invalid credentials or server error." });
      }
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="/">Home</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '400px' }}>
          <h3 className="text-center mb-4">Login</h3>

          {/* Alert Messages */}
          {message && <div className="alert alert-danger">{message}</div>}
          {errors.message && <div className="alert alert-danger">{errors.message}</div>}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>

          {/* Footer */}
          <p className="mt-3 text-center text-muted" style={{ fontSize: '0.9rem' }}>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-auto py-3 bg-light text-muted">
        <small>© {new Date().getFullYear()} MERN Auth System</small>
      </footer>
    </>
  );
}
  

export default Login;
