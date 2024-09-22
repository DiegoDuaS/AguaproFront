import './login.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/authProvider';
import PropTypes from 'prop-types';
import { useApi } from '../../hooks/useApi';
import { CircularProgress } from '@mui/material';

const RegisterPage = ({ onRouteChange }) => {
  const { userLogin, loading} = useApi();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [error]);

  const handleSubmitLogin = async () => {
    try {
        const response = await userLogin(login, username, password);
        
        if (response.ok) {
            onRouteChange('AdminPage');
            console.log('Logging in with', username, password);                 
            // Save token to local storage

            console.log("token", localStorage.getItem('token'));
            return;
        }
    } catch (error) {
        setError(error.message); 
    }
};
  
  const handleLogin = () => {
     onRouteChange('Login');
  };

return (
    <div className="mainContainer">
      <div className="titleContainer">Aguatesa Registro</div>
      
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
        <input
          className="inputBox"
          type="password"
          placeholder="Confirme su contraseña"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <input
          className="inputBox"
          type="email"
          placeholder="Ingrese su correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        {loading && (<div> <CircularProgress /> </div>)}
        {error && <div className="errorMessage">{error}</div>}
        <button className="inputButton" onClick={handleSubmitLogin}>
          Iniciar Sesión
        </button>
        <button className="inputButton" onClick={() => onRouteChange('Bombas de agua')}>
          Regresar
        </button>
        <div className="registerContainer">
          ¿Tienes cuenta?{' '}
          <span className="registerLink" onClick={handleLogin}>
          Inicia Sesión
          </span>
        </div>
        <div className="spacelogin"></div>
      </div>
    </div>
  );
};

RegisterPage.propTypes = {
  onRouteChange: PropTypes.func.isRequired
};

export default RegisterPage;
