import React, { useEffect, useRef, useState } from 'react';
import './formsSer.css';
import { Button } from 'react-bootstrap';

const FormsSer = ({type, setShowForms}) => {
    const [name, setName] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [tipoServicio, setTipoServicio] = useState("");
    const [mensaje, setMensaje] = useState("");


    if (type === 1){
        return(
            <div className="forms">    
            <button className="close-butt" onClick={() => setShowForms(false)}>X</button>       
                <div className='inputsect'>
                    <label className='labelforms_ser2'><strong>Nombre Completo</strong></label>
                    <input
                        type="text" 
                        className="forms_input"
                        value={name}
                        placeholder="Nombre Completo"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='inputsect'>
                    <label className='labelforms_ser2'><strong>Correo Electrónico</strong></label>
                    <input
                        type="text" 
                        className="forms_input"
                        value={correo}
                        placeholder="Correo Electrónico"
                        onChange={(e) => setCorreo(e.target.value)}
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
                    />
                </div>
                <div className="dropdown-forms">
                    <label className="labelforms_ser3">Departamento</label>
                    <select
                        id="tipoMaterial"
                        name="tipoMaterial"
                        className="dropdown-forms-select"
                        value={departamento}
                        onChange={(e) => setDepartamento(e.target.value)}
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
                    id="estudioHidrogeologico"
                    name="estudioHidrogeologico"
                    className="dropdown-forms-select"
                    value={tipoServicio}
                    onChange={(e) => setTipoServicio(e.target.value)}
                    >
                    <option value="">Seleccione una opción</option>
                    <option value="Servicio 1">Servicio 1</option>
                    <option value="Servicio 2">Servicio 2</option>
                    </select>
                </div>
                <div className='inputsect'>
                    <label className='labelforms_ser2'><strong>Deja un mensaje</strong></label>
                    <textarea
                        type="text" 
                        className="forms_input2"
                        value={mensaje}
                        placeholder="..."
                        maxlength="500"
                        onChange={(e) => setMensaje(e.target.value)}
                    />
                </div>
                <button className='sendforms'>Enviar</button>
        </div>
        );
    }

};

export default FormsSer;
