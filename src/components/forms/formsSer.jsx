import React, { useEffect, useRef, useState } from 'react';
import './formsSer.css';
import { Button } from 'react-bootstrap';

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
};

export default FormsSer;
