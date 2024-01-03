import React, { useState } from 'react';
import { useUser } from './UserContext';

const Login = () => {
  const { login } = useUser();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login (you can replace this with an API call)
    const user = { username: formData.username, /* add more info if needed */ };
    login(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
