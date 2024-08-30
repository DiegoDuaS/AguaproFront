import './login.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/authProvider';
import PropTypes from 'prop-types';
import { useApi } from '../../hooks/useApi';

const LoginPage = ({ onRouteChange }) => {
  const { userLogin, loading} = useApi();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        {error && <div className="errorMessage">{error}</div>}
        <button className="inputButton" onClick={handleSubmitLogin}>
          Iniciar Sesión
        </button>
        <button className="inputButton" onClick={() => onRouteChange('Bombas de agua')}>
          Regresar
        </button>
        
        <div className="spacelogin"></div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  onRouteChange: PropTypes.func.isRequired
};

export default LoginPage;
