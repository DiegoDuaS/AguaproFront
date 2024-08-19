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
      <div className="titleContainer">Aguatesa Login</div>
      
      <div className="inputContainer">
      <div className="spacelogin"></div>
        <input
          className="inputBox"
          type="text"
          placeholder="Ingrese su usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="inputBox"
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="inputButton" onClick={handleLogin}>
          Iniciar Sesión
        </button>
        <button className="inputButton" onClick={() => onRouteChange('Bombas de agua')}>
          Regresar
        </button>
        {error && <div className="errorMessage">{error}</div>}
        <div className="spacelogin"></div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  onRouteChange: PropTypes.func.isRequired
};

export default LoginPage;
