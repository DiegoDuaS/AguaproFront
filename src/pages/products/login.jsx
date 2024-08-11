import './login.css';
import { useState } from 'react';
//import withRouting from './RouterHOC.jsx'; // Import the withRouting HOC
import PropTypes from 'prop-types';
const LoginPage = ({ onRouteChange }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    onRouteChange('AdminPage');
    console.log('Logging in with', username, password);
  };
return (
    <div className="mainContainer">
      <div className="titleContainer">Login</div>
      <div className="inputContainer">
        <input
          className="inputBox"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="inputBox"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="inputButton" onClick={handleLogin}>
          Login
        </button>
        <button className="inputButton" onClick={() => onRouteChange('Bombas de agua')}>
          Back
        </button>
        {error && <div className="errorMessage">{error}</div>}
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  onRouteChange: PropTypes.func.isRequired
};

export default LoginPage;
