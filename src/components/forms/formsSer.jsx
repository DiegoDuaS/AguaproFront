import React, { useEffect, useRef, useState } from 'react';
import './formsSer.css';
import { Button } from 'react-bootstrap';

const FormsSerPoz = ({type}) => {
    const [name, setName] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [atencion, setAtencion] = useState("");
    const [nit, setNit] = useState("");
    const [latitud, setlatitud] = useState("");
    const [longitud, setlongitud] = useState("");
    const [direccionPozo, setDireccionPozo] = useState("");
    const [profundidad, setProfundidad] = useState("");
    const [diametro, setDiametro] = useState("");
    const [tipoMaterial, setTipoMaterial] = useState("");
    const [estudioHidrogeologico, setEstudioHidrogeologico] = useState("");
    const [estudioArchHidrogeologico, setEstudioArchHidrogeologico] = useState(null);
    const [quiereEstudio, setQuiereEstudio] = useState("");
    const [horasAforo, setHorasAforo] = useState("");
    const [horasLimpieza, setHorasLimpieza] = useState("");
    const [gruaService, setGruaService] = useState("");

    if (type === 1){
        return(
            <div className="forms">
            <div className='persoinfo'>
                <div className='inputsect'>
                    <label className='labelforms_ser'><strong>Nombre de Juridica o Individual:</strong></label>
                    <input
                        type="text" 
                        className="forms_input personalinfo"
                        value={name}
                        placeholder="Nombre"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='inputsect'>
                    <label className='labelforms_ser'><strong>Dirección:</strong></label>
                    <input
                        type="text" 
                        className="forms_input personalinfo"
                        value={direccion}
                        placeholder="Dirección Personal o de Empresa"
                        onChange={(e) => setDireccion(e.target.value)}
                    />
                </div>
            </div>
            <div className='persoinfo'>
                <div className='inputsect'>
                    <label className='labelforms_ser'><strong>Correo:</strong></label>
                    <input
                        type="text" 
                        className="forms_input personalinfo"
                        value={correo}
                        placeholder="Correo Electónico"
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <div className='inputsect'>
                    <label className='labelforms_ser'><strong>Télefono:</strong></label>
                    <input
                        type="number" 
                        className="forms_input personalinfo"
                        value={telefono}
                        placeholder="Número de Telefóno"
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>
            </div>
            <div className='persoinfo'>
                <div className='inputsect'>
                    <label className='labelforms_ser'><strong>Atención a:</strong></label>
                    <input
                        type="text" 
                        className="forms_input personalinfo"
                        value={atencion}
                        placeholder="PlaceHolder"
                        onChange={(e) => setAtencion(e.target.value)}
                    />
                </div>
                <div className='inputsect'>
                    <label className='labelforms_ser'><strong>Nit:</strong></label>
                    <input
                        type="email" 
                        className="forms_input personalinfo"
                        value={nit}
                        placeholder="Nit"
                        onChange={(e) => setNit(e.target.value)}
                    />
                    <p className='optional_label'>*opcional</p>
                </div>
            </div>
            
            <div className='inputsect'>
                <label className='labelforms_ser2'><strong>¿Cuáles son las coordenadas de donde se encuentra el punto de perforación?</strong></label>
                <input
                    type="number" 
                    className="forms_input"
                    value={latitud}
                    placeholder="Latitud"
                    onChange={(e) => setlatitud(e.target.value)}
                />
                <div className='espacio'/>
                <input
                    type="number" 
                    className="forms_input"
                    value={longitud}
                    placeholder="Longitud"
                    onChange={(e) => setlongitud(e.target.value)}
                />
            </div>
            <div className='inputsect'>
                <label className='labelforms_ser2'><strong>Dirección donde se realizará el Pozo Mecánico</strong></label>
                <input
                    type="text" 
                    className="forms_input"
                    value={direccionPozo}
                    placeholder="Dirección"
                    onChange={(e) => setDireccionPozo(e.target.value)}
                />
            </div>
            <div className='inputsect'>
                <label className='labelforms_ser2'><strong>¿Cuál seria la profundidad requerida?</strong></label>
                <input
                    type="number" 
                    className="forms_input"
                    value={profundidad}
                    placeholder="0.0 m"
                    onChange={(e) => setProfundidad(e.target.value)}
                />
            </div>
            <div className='inputsect'>
                <label className='labelforms_ser2'><strong>¿Cuál es el diámetro de perforación?</strong></label>
                <input
                    type="number" 
                    className="forms_input"
                    value={diametro}
                    placeholder="0.0 m"
                    onChange={(e) => setDiametro(e.target.value)}
                />
            </div>
            <div className="dropdown-forms">
                <label className='labelforms_ser3'>Tipo de Material para Entubado:</label>
                <select
                    id="tipoMaterial"
                    name="tipoMaterial"
                    className="dropdown-forms-select"
                    value={tipoMaterial}
                    onChange={(e) => setTipoMaterial(e.target.value)}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="PVC">PVC</option>
                    <option value="aceroAlCarbon">Acero al Carbón</option>
                </select>
            </div>
            <div className="dropdown-forms">
                <label className="labelforms_ser3">¿Tiene Estudio Hidrogeológico?</label>
                <select
                id="estudioHidrogeologico"
                name="estudioHidrogeologico"
                className="dropdown-forms-select"
                value={estudioHidrogeologico}
                onChange={(e) => setEstudioHidrogeologico(e.target.value)}
                >
                <option value="">Seleccione una opción</option>
                <option value="Si">Sí</option>
                <option value="No">No</option>
                </select>
            </div>
            {estudioHidrogeologico === "Si" && (
                <div className="upload_section">
                    <label className="labelforms_ser3">Cargue el Archivo del Estudio</label>
                    {estudioArchHidrogeologico && (
                    <p className='file_name'>{estudioArchHidrogeologico.name}</p>
                    )}
                    <input
                    id="upload_btn"
                    type="file" 
                    onChange={(e) => setEstudioArchHidrogeologico(e.target.files[0])}
                    />
                    <label htmlFor="upload_btn" className="upload_image">Subir Archivo</label>
                </div>
            )}
            {estudioHidrogeologico === "No" && (
                <div className="dropdown-forms">
                <label className="labelforms_ser3">¿Desea realizar un estudio?</label>
                <select
                    id="quiereEstudio"
                    name="quiereEstudio"
                    className="dropdown-forms-select"
                    value={quiereEstudio}
                    onChange={(e) => setQuiereEstudio(e.target.value)}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                </select>
                </div>
            )}
            <div className='inputsect'>
                <label className='labelforms_ser2'><strong>¿Cuántas horas de aforo son requeridas?</strong></label>
                <input
                    type="number" 
                    className="forms_input"
                    value={horasAforo}
                    placeholder="0"
                    onChange={(e) => setHorasAforo(e.target.value)}
                />
            </div>
            <div className='inputsect'>
                <label className='labelforms_ser2'><strong>¿Cuántas horas de limpieza son requeridas?</strong></label>
                <input
                    type="number" 
                    className="forms_input"
                    value={horasLimpieza}
                    placeholder="0"
                    onChange={(e) => setHorasLimpieza(e.target.value)}
                />
            </div>
            <button className='sendforms'>Enviar</button>
        </div>
        );
    }

};

export default FormsSerPoz;
