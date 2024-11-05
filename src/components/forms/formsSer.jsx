import React, { useEffect, useRef, useState } from 'react';
import './formsSer.css';
import { Button } from 'react-bootstrap';
<<<<<<< HEAD
import useRegisterSolicitud from '../../hooks/useRegisterSolicitud';
import useSolicitud from '../../hooks/email/useSolicitud';

const FormsSer = ({type, setShowForms, setSuccessMessage, setErrorMessage}) => {
    const [name, setName] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [tipoServicio, setTipoServicio] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [servicios, setServicios] = useState([]); // State for services
    const [loadingServices, setLoadingServices] = useState(true); // Loading state for services
    const [errorServices, setErrorServices] = useState(null);

    const { registerSolicitud, loading, error, response } = useRegisterSolicitud();
    const { emailSolicitud, loading2, error2, response2 } = useSolicitud();
    
    
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/servicios'); // Replace with your actual endpoint
                const data = await response.json();
                if (data.status === "success") {
                    setServicios(data.data);
                } else {
                    setErrorServices("Error fetching services");
                }
            } catch (error) {
                setErrorServices("Error fetching services");
            } finally {
                setLoadingServices(false);
            }
        };
        fetchServices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");  // Reset success message
        setErrorMessage("");    // Reset error message
        
        const solicitudData = {
            nombre: name,
            telefono,
            correo,
            empresa,
            departamento: parseInt(departamento),
            tipo_servicio: parseInt(tipoServicio),
            mensaje,
        };
        
        // Primera solicitud: registrar solicitud principal
        await registerSolicitud(solicitudData);
        
        // Si hubo un error en registerSolicitud, no continuar y mostrar error
        if (error) {
            setErrorMessage("Error al enviar la solicitud");
            return;
        }
        
        // Segunda solicitud: enviar correo de confirmación
        await emailSolicitud(correo);
    
        // Verificar resultado de emailSolicitud
        if (error2) {
            setErrorMessage("Error al enviar el correo de confirmación");
        } else {
            setSuccessMessage("Solicitud y correo de confirmación enviados con éxito");
            setShowForms(false); // Cerrar el formulario solo si ambas solicitudes fueron exitosas
        }
    };

    if (type === 1) {
        return (
            <form onSubmit={handleSubmit} className="forms">
                <button className="close-butt" onClick={() => setShowForms(false)}>X</button>
                <div className='inputsect'>
                    <label className='labelforms_ser2'><strong>Nombre Completo</strong></label>
                    <input
                        type="text"
                        className="forms_input"
                        value={name}
                        placeholder="Nombre Completo"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className='inputsect'>
                    <label className='labelforms_ser2'><strong>Correo Electrónico</strong></label>
                    <input
                        type="email"
                        className="forms_input"
                        value={correo}
                        placeholder="Correo Electrónico"
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div className='inputsect'>
                    <label className='labelforms_ser2'><strong>Número de Teléfono</strong></label>
                    <input
                        className="forms_input"
                        type="tel"
                        pattern="[0-9]{4}-[0-9]{4}"
                        value={telefono}
                        placeholder="1234-5678"
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                    />
                </div>
                <div className='inputsect'>
                    <label className='labelforms_ser2'><strong>Empresa</strong></label>
                    <input
                        type="text"
                        className="forms_input"
                        value={empresa}
                        placeholder="Nombre Empresa"
                        onChange={(e) => setEmpresa(e.target.value)}
                        required
                    />
                </div>
                <div className="dropdown-forms">
                    <label className="labelforms_ser3">Departamento</label>
                    <select
                        className="dropdown-forms-select"
                        value={departamento}
                        onChange={(e) => setDepartamento(e.target.value)}
                        required
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="1">Guatemala</option>
                        <option value="2">El Progreso</option>
                        <option value="3">Sacatepéquez</option>
                        <option value="4">Chimaltenango</option>
                        <option value="5">Escuintla</option>
                        <option value="6">Santa Rosa</option>
                        <option value="7">Sololá</option>
                        <option value="8">Totonicapán</option>
                        <option value="9">Quetzaltenango</option>
                        <option value="10">Suchitepéquez</option>
                        <option value="11">Retalhuleu</option>
                        <option value="12">San Marcos</option>
                        <option value="13">Huehuetenango</option>
                        <option value="14">Quiché</option>
                        <option value="15">Baja Verapaz</option>
                        <option value="16">Alta Verapaz</option>
                        <option value="17">Petén</option>
                        <option value="18">Izabal</option>
                        <option value="19">Zacapa</option>
                        <option value="20">Chiquimula</option>
                        <option value="21">Jalapa</option>
                        <option value="22">Jutiapa</option>
                    </select>
                </div>
                <div className="dropdown-forms">
                    <label className="labelforms_ser3">Tipo de Servicio</label>
                    <select
                        className="dropdown-forms-select"
                        value={tipoServicio}
                        onChange={(e) => setTipoServicio(e.target.value)}
                        required
                    >
                        <option value="">Seleccione una opción</option>
                        {loadingServices ? (
                            <option>Loading...</option>
                        ) : errorServices ? (
                            <option>Error loading services</option>
                        ) : (
                            servicios.map((servicio) => (
                                <option key={servicio.id_tipo} value={servicio.id_tipo}>
                                    {servicio.nombre}
                                </option>
                            ))
                        )}
                    </select>
                </div>
                <div className='inputsect'>
                    <label className='labelforms_ser2'><strong>Deja un mensaje</strong></label>
                    <textarea
                        className="forms_input2"
                        value={mensaje}
                        placeholder="..."
                        maxLength="500"
                        onChange={(e) => setMensaje(e.target.value)}
                    />
                </div>
                <Button type="submit" className='sendforms' disabled={loading}>
                    {loading ? "Enviando..." : "Enviar"}
                </Button>
            </form>
        );
    }
    return null;
=======

const FormsSer = ({type}) => {
    const [name, setName] = useState("");
    const [correo, setCorreo] = useState("");
    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [q4, setQ4] = useState("");

    return (
        <div className="forms">
            <div className='persoinfo'>
                <div className='inputsect'>
                    <label className='labelforms_ser'><strong>Nombre Completo:</strong></label>
                    <input
                        type="text" 
                        className="forms_input personalinfo"
                        value={name}
                        placeholder="Nombre"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='inputsect'>
                    <label className='labelforms_ser'><strong>Correo Electrónico:</strong></label>
                    <input
                        type="email" 
                        className="forms_input personalinfo"
                        value={correo}
                        placeholder="Correo Electrónico"
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
            </div>
            
            <div className='inputsect'>
                <label className='labelforms_ser2'><strong>P1:</strong></label>
                <input
                    type="text" 
                    className="forms_input"
                    value={q1}
                    placeholder="Pregunta 1"
                    onChange={(e) => setQ1(e.target.value)}
                />
            </div>
            <div className='inputsect'>
                <label className='labelforms_ser2'><strong>P2:</strong></label>
                <input
                    type="text" 
                    className="forms_input"
                    value={q2}
                    placeholder="Pregunta 2"
                    onChange={(e) => setQ2(e.target.value)}
                />
            </div>
            <div className='inputsect'>
                <label className='labelforms_ser2'><strong>P3:</strong></label>
                <input
                    type="text" 
                    className="forms_input"
                    value={q3}
                    placeholder="Pregunta 3"
                    onChange={(e) => setQ3(e.target.value)}
                />
            </div>
            <div className='inputsect'>
                <label className='labelforms_ser2'><strong>P4:</strong></label>
                <input
                    type="text" 
                    className="forms_input"
                    value={q4}
                    placeholder="Pregunta 4"
                    onChange={(e) => setQ4(e.target.value)}
                />
            </div>
            <button className='sendforms'>Enviar</button>
        </div>
    );
>>>>>>> testing
};

export default FormsSer;
