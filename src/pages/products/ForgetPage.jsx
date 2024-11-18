import './login.css';
import { useState, useEffect } from 'react';
import StateCard from '../../components/cards/stateCard';
import useVerifyUser from '../../hooks/useVerifyUser';
import useVerificationCode from '../../hooks/email/useVerificationCode';
import useVerifyCode from '../../hooks/useVerifyCode';
import useChangePassword from '../../hooks/useChangePassword';
import { CircularProgress } from '@mui/material';

const ForgetPage = ({ onRouteChange }) => {
  const [phase, setPhase] = useState(1); // Fase actual
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(1200);
  const { verifyUser, isLoading: isVeryfingUser, errorMessage: veryfingError } = useVerifyUser('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');
  const { emailVerification, loading2, error2, response2 } = useVerificationCode();
  const { verifyCode, isLoading: isVeryfingCode, errorMessage: veryfingCodeError } = useVerifyCode('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');
  const { changePassword, isLoading: isChanging, errorMessage: changingError } = useChangePassword('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');

  useEffect(() => {
    if (phase === 2 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); 
    }
  }, [phase, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
      setWarningMessage('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [successMessage, errorMessage, warningMessage]);
  
  const handleSendEmail = async () => {
    if (username === '' || email === ''){
        setWarningMessage("Completa todos los campos")
    }
    else{
        try{
          const result = await verifyUser(username, email);
          if(result.success === true){
            try{
              const emailsent = await emailVerification(email);
              console.log(emailsent)
              if(emailsent.status === 'success'){
                setTimeLeft(1200);
                setSuccessMessage("Correo Enviado")
                setPhase(2);
              }
              else{
                setErrorMessage("Hubo un error al enviar el correo, intentalo nuevamente")
              }
            }
            catch{
              setErrorMessage("Hubo un error al enviar el correo, intentalo nuevamente")
            }
            
          }
          else{
            setErrorMessage("No se pudo verificar el usuario con el correo")
          }
        }
        catch{
          setErrorMessage("Error durante la verifiacion, intentalo nuevamente")
        }
        
        
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode === ''){
        setWarningMessage("Ingresa el Código de Verificación")
    }
    else{
      try{
        const result = await verifyCode(email,verificationCode)
        if(result.success === true){
          setSuccessMessage("Código Verificado")
          setPhase(3);
        }
        else{
          setErrorMessage("No se pudo verificar el código, prueba nuevamente")
        }
      }
      catch{
        setErrorMessage("Error al verificar el código, prueba nuevamente2")
      }
        
    }
    
  };

  const handleChangePassword = async () => {
    // Validar si las contraseñas coinciden
    if (newPassword !== confirmPassword) {
      setWarningMessage('Las contraseñas no coinciden');
      return;
    }
    else if (newPassword === '' || confirmPassword === '') {
      setWarningMessage('Completa todos los campos');
      return;
    }
    else{
      try{
        const result = await changePassword(email, verificationCode, newPassword)
        if (result.success === true){
          setSuccessMessage('Contraseña cambiada con éxito')
          setTimeout(() => {
            onRouteChange('Login'); 
          }, 2300);
        }
        else{
          setErrorMessage('Hubo un error al cambiar la contraseña, intenta nuevamente')
        }
      }
      catch{
        setErrorMessage('Hubo un error al cambiar la contraseña, intenta nuevamente')
      }
      
    }
  };

  return (
    <div className="mainContainer">
      <StateCard message={successMessage} isOpen={!!successMessage} type={1}/>
      <StateCard message={errorMessage} isOpen={!!errorMessage} type={2}/>
      <StateCard message={warningMessage} isOpen={!!warningMessage} type={4}/>
      <div className="titleContainer">Recupera tu Contraseña</div>

      {phase === 1 && (
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
            placeholder="Ingrese su correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isVeryfingUser && (
            <div className="loadingIndicator">
                <CircularProgress/>
            </div>
          )}
          {loading2 && (
            <div className="loadingIndicator">
                <CircularProgress/>
            </div>
          )}
          <button className="inputButton" onClick={handleSendEmail}>
            Enviar Correo
          </button>
          <button className="inputButton" onClick={() => onRouteChange('Login')}>
            Regresar
          </button>
          <div className="spacelogin"></div>
        </div>
      )}

      {phase === 2 && (
        <div className="inputContainer">
          <div className="spacelogin"></div>
          <p className='code-ver'>Revisa el inbox de tu correo</p>
          {timeLeft > 0 ? (
            <p className='code-ver'>
                El código vencerá en <strong>{formatTime(timeLeft)}</strong> minutos
            </p>
            ) : (
            <p className='code-ver'>El código ha vencido. Por favor, solicita uno nuevo.</p>
          )}
          <input
            className="inputBox"
            type="text"
            placeholder="Ingrese el código de verificación"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          {isVeryfingCode && (
            <div className="loadingIndicator">
                <CircularProgress/>
            </div>
          )}
          {isVeryfingUser && (
            <div className="loadingIndicator">
                <CircularProgress/>
            </div>
          )}
          {loading2 && (
            <div className="loadingIndicator">
                <CircularProgress/>
            </div>
          )}
          <button className="inputButton" onClick={handleVerifyCode}>
            Verificar Código
          </button>
          <button className="inputButton" onClick={handleSendEmail}>
            Renviar Código
          </button>
          <div className="spacelogin"></div>
        </div>
      )}

      {phase === 3 && (
        <div className="inputContainer">
          <div className="spacelogin"></div>
          <input
            className="inputBox"
            type="text"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            className="inputBox"
            type="text"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {isChanging && (
            <div className="loadingIndicator">
                <CircularProgress/>
            </div>
          )}
          <button className="inputButton" onClick={handleChangePassword}>
            Cambiar Contraseña
          </button>
          <button className="inputButton" onClick={() => setPhase(2)}>
            Regresar
          </button>
          <div className="spacelogin"></div>
        </div>
      )}
    </div>
  );
};

export default ForgetPage;
