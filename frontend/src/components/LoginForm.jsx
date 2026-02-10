import { useState } from "react";

function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
