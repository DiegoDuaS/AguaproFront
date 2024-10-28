import React, { useEffect, useRef, useState } from 'react';
import './formsSer.css';

const FormsSerMant = ({type}) => {
    const [name, setName] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [atencion, setAtencion] = useState("");
    const [nit, setNit] = useState("");
    const [gruaService, setGruaService] = useState("");
    const [cantidadTubos, setCantidadTubos] = useState("");
    const [diametroTubos, setDiametroTubos] = useState("");
    const [profundidadPozo, setProfundidadPozo] = useState("");
    const [diametroCasePozo, setDiametroCasePozo] = useState("");
    const [ultimaLimpiezaPozo, setUltimaLimpiezaPozo] = useState(null);
    const [horasLimpieza, setHorasLimpieza] = useState("");
    const [inspeccionCamara, setInspeccionCamara] = useState("");
    const [aplicarAditivosLimpieza, setAplicarAditivosLimpieza] = useState("");
    const [aditivos, setAditivos] = useState("");

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

        <div className="dropdown-forms">
            <label className='labelforms_ser3'>¿Qué Servicio de Grúa Desea?</label>
            <select
                id="tipoMaterial"
                name="tipoMaterial"
                className="dropdown-forms-select"
                value={gruaService}
                onChange={(e) => setGruaService(e.target.value)}
            >
                <option value="">Seleccione una opción</option>
                <option value="Extracción e instalación de equipo">Extracción e instalación de equipo</option>
                <option value="Aforo">Aforo</option>
                <option value="Limpieza">Limpieza</option>
            </select>
        </div>
        
        <div className='inputsect'>
            <label className='labelforms_ser2'><strong>¿Cuál es la cantidad de tubos que tiene el pozo mecánico?</strong></label>
            <input
                type="number" 
                className="forms_input"
                value={cantidadTubos}
                placeholder="0"
                onChange={(e) => setCantidadTubos(e.target.value)}
            />
        </div>

        <div className='inputsect'>
            <label className='labelforms_ser2'><strong>¿Cuál es el diámetro de los tubos de succión?</strong></label>
            <input
                type="number" 
                className="forms_input"
                value={diametroTubos}
                placeholder="0 cm"
                onChange={(e) => setDiametroTubos(e.target.value)}
            />
        </div>

        <div className='inputsect'>
            <label className='labelforms_ser2'><strong>¿Cuál es la profundidad total del pozo?</strong></label>
            <input
                type="number" 
                className="forms_input"
                value={profundidadPozo}
                placeholder="0 m"
                onChange={(e) => setProfundidadPozo(e.target.value)}
            />
        </div>

        <div className='inputsect'>
            <label className='labelforms_ser2'><strong>¿Cuál es el diámetro del case de pozo mecánico?</strong></label>
            <input
                type="number" 
                className="forms_input"
                value={diametroCasePozo}
                placeholder="0 cm"
                onChange={(e) => setDiametroCasePozo(e.target.value)}
            />
        </div>

        <div className='inputsect'>
            <label className='labelforms_ser2'><strong>¿Cuándo fue la ultima vez que realizaron limpieza de pozo?</strong></label>
            <input
                type="date" 
                className="forms_input"
                value={ultimaLimpiezaPozo}
                placeholder="dd-mm-yyyy" 
                onChange={(e) => setUltimaLimpiezaPozo(e.target.value)}
            />
        </div>

        <div className='inputsect'>
            <label className='labelforms_ser2'><strong>¿Cuántas horas de limpieza son requeridas?</strong></label>
            <input
                type="number" 
                className="forms_input"
                value={horasLimpieza}
                placeholder="0 h"
                onChange={(e) => setHorasLimpieza(e.target.value)}
            />
        </div>

        <div className="dropdown-forms">
            <label className='labelforms_ser3'>¿Desea realizar inspección cámara?</label>
            <select
                id="tipoMaterial"
                name="tipoMaterial"
                className="dropdown-forms-select"
                value={inspeccionCamara}
                onChange={(e) => setInspeccionCamara(e.target.value)}
            >
                <option value="">Seleccione una opción</option>
                <option value="Sí">Si</option>
                <option value="No">No</option>
            </select>
        </div>

        <div className="dropdown-forms">
            <label className='labelforms_ser3'>¿Desea aplicar aditivos de limpieza?</label>
            <select
                id="tipoMaterial"
                name="tipoMaterial"
                className="dropdown-forms-select"
                value={aplicarAditivosLimpieza}
                onChange={(e) => setAplicarAditivosLimpieza(e.target.value)}
            >
                <option value="">Seleccione una opción</option>
                <option value="Sí">Si</option>
                <option value="No">No</option>
            </select>
        </div>

        {aplicarAditivosLimpieza === "Sí" && (
            <div className='inputsect'>
                <label className='labelforms_ser2'><strong>Cantidad de aditivos</strong></label>
                <input
                    type="number" 
                    className="forms_input"
                    value={aditivos}
                    placeholder="0"
                    onChange={(e) => setAditivos(e.target.value)}
                />
            </div>
            )}

        <button className='sendforms'>Enviar</button>
    </div>
    );
};

export default FormsSerMant;
