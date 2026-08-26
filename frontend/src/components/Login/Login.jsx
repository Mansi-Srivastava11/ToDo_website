import { useState } from "react";
import { loginUser } from "../../services/authService.js";

function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        email,
        password,
      });

      onLogin(data.user);
    } catch (error) {
      setError(error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Welcome back</p>

        <h1>Login to Keep Notes</h1>

        <p className="auth-subtitle">
          Sign in to access your personal notes.
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="primary-btn auth-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <button
            type="button"
            className="auth-link"
            onClick={onRegister}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;