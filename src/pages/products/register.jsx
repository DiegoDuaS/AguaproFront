import './login.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/authProvider';
import PropTypes from 'prop-types';
import useRegisterUser from '../../hooks/useRegisterUser';
import { CircularProgress } from '@mui/material';
import { useApi } from '../../hooks/useApi';
import StateCard from '../../components/cards/stateCard';

const RegisterPage = ({ onRouteChange }) => {
  const { registerUser,loading,error } = useRegisterUser();
  const { userLogin } = useApi(); // Destructure userLogin from useApi
  const { login } = useAuth(); // Destructure login from useAuth
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [errorMessage]);


  const handleSubmitRegister = async () => {
    if (password !== passwordConfirm) {
        setErrorMessage('Las contraseñas no coinciden');
        setSuccessMessage(''); // Clear success message
        return;
    }

    const userData = { username, password, email, role };
    const result = await registerUser(userData); // Wait for the result

    console.log('Register User Result:', result); // Log the result

    // Check if result contains data or error
    if (result.data) {
        // Automatically log the user in after successful registration
        console.log("register success");
        try {
            const loginResponse = await userLogin(login, username, password);
            console.log('Login Response:', JSON.stringify(loginResponse, null, 2));
            if (loginResponse.status=="success") {
                console.log("login success");
                setSuccessMessage(result.data.message); // Set success message
                setErrorMessage(''); // Clear error message
                onRouteChange('Bombas de agua'); // Redirect to Bombas de agua
            }
        } catch (loginError) {
            setSuccessMessage(result.data.message); // Set success message
            setErrorMessage(''); // Clear error message
            setErrorMessage('Error during automatic login: ' + loginError.message);
        }
    } else if (result.error) {
        setErrorMessage(result.error); // Set error message if exists
        setSuccessMessage(''); // Clear success message
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
          type="text"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="inputBox"
          type="text"
          placeholder="Confirme su contraseña"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <input
          className="inputBox"
          type="email"
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {loading && (<div> <CircularProgress /> </div>)}
        <button className="inputButton" onClick={handleSubmitRegister}>
          Registrar Usuario
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
        <StateCard message={errorMessage} isOpen={!!errorMessage} type={2}/>
      </div>
    </div>
    
  );
};

RegisterPage.propTypes = {
  onRouteChange: PropTypes.func.isRequired
};

export default RegisterPage;

