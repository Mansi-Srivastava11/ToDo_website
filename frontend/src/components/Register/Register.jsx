import { useState } from "react";
import { registerUser } from "../../services/authService.js";

function Register({ onRegister, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser({
        name,
        email,
        password,
      });

      onRegister(data.user);
    } catch (error) {
      setError(error.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Get started</p>

        <h1>Create your account</h1>

        <p className="auth-subtitle">
          Create an account to keep your notes personal.
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="auth-field">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="auth-field">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="primary-btn auth-btn"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <button
            type="button"
            className="auth-link"
            onClick={onLogin}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;