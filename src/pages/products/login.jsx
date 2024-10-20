import './login.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/authProvider';
import PropTypes from 'prop-types';
import { useApi } from '../../hooks/useApi';
import { CircularProgress } from '@mui/material';
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

const LoginPage = ({ onRouteChange }) => {
  const { userLogin, loading} = useApi();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
        const responseData = await userLogin(login, username, password);
        
        if (responseData.role === 'admin') {
            onRouteChange('AdminPage');
        } else {
            onRouteChange('Bombas de agua');
        }
        
    } catch (error) {
        setError(error.message); 
    }
};
  
  const handleRegister = () => {
     onRouteChange('RegisterPage');
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
        <div className='passwordInputBox'>
          <input
            className="passinputBox"
            type={showPassword ? 'text' : 'password'}
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmitLogin(); 
              }
            }}
          />
          <div className="toggleButton" onClick={toggleShowPassword}>
            {showPassword ?  <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
          </div>
        </div>
        {loading && (<div> <CircularProgress /> </div>)}
        {error && <div className="errorMessage">{error}</div>}
        <button className="inputButton" onClick={handleSubmitLogin}>
          Iniciar Sesión
        </button>
        <button className="inputButton" onClick={() => onRouteChange('Bombas de agua')}>
          Regresar
        </button>
        <div className="registerContainer">
          ¿No tienes cuenta?{' '}
          <span className="registerLink" onClick={handleRegister}>
            Regístrate Ahora
          </span>
        </div>
        <div className="spacelogin"></div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  onRouteChange: PropTypes.func.isRequired
};

export default LoginPage;
