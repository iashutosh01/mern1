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

      const config = {
        withCredentials: true // sends cookies for authentication if needed
      };

      try {
        const response = await axios.post(
          'http://localhost:5002/auth/login',
          body,
          config
        );

        updateUserDetails(response.data.user);
        navigate("/dashboard"); // Redirect to dashboard after login
      } catch (error) {
        console.error(error);
        setErrors({ message: "Invalid credentials or server error." });
      }
    }
  };

  return (
    <div className="container text-center mt-4">
      {message && <p className="text-danger">{message}</p>}
      {errors.message && <p className="text-danger">{errors.message}</p>}
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
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
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
