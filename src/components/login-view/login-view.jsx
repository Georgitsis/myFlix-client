import { useState } from "react";
export const LoginView = ({ onLoggedIn, onSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();
    fetch(
      `https://fierce-meadow-39793-bd539c2b94d7.herokuapp.com/login?Username=${username}&Password=${password}`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onLoggedIn(data.user.Username, data.token);
      });
  };

  const handleSignUp = () => {
    onSignUp(true);
  };

  return (
    <div>
      <span>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={6}
              maxLength={20}
              d
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </span>
      <span>
        <button onClick={handleSignUp}>Sign Up</button>
      </span>
    </div>
  );
};
