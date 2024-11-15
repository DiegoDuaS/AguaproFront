import './services.css'
import React, { useState, useEffect } from 'react';
import FormsSer from '../../components/forms/formsSer';
import { AiFillEdit } from "react-icons/ai";
import DisplayLeft from '../../components/displayser/displayleft';
import DisplayRight from '../../components/displayser/displayright';
import extraccionImg from '../../image/extraccion.png';
import perforacionImg from '../../image/perforacion2.jpg';
import limpiezaImg from '../../image/limpieza.png';
import incendioImg from '../../image/incendio.jpg';
import panelesImg from '../../image/paneles.jpg';
import bombeoImg from '../../image/bombeo.jpg';
import camaraImg from '../../image/camara.jpg';
import limpiezaCImg from '../../image/limpiezaC.jpg';
import hidroNeuImg from '../../image/hidroneumatico.jpg';
import mantECImg from '../../image/mantec.jpg';
import StateCard from '../../components/cards/stateCard';

function NuestrosServicios() {
    const [showForms, setShowForms] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
          setSuccessMessage('');
          setErrorMessage('');
        }, 5000);
    
        return () => clearTimeout(timer);
      }, [successMessage, errorMessage]);

    return (
        <main className="main-content-ser">
            <h2>Nuestros Servicios</h2>
            <p className="textservice">
            En AGUATESA, combinamos tecnología de punta, equipo especializado y un profundo conocimiento del sector para ofrecer 
            soluciones que hacen la diferencia. Cada proyecto es una oportunidad para demostrar nuestro compromiso con la eficiencia, 
            la calidad y el mejor servicio al cliente en cada paso del camino. Nuestro catálogo de servicios abarca todas las etapas de instalación, 
            mantenimiento y optimización de sistemas de agua.
            </p>
            <DisplayRight 
                titulo={"Extracción e Instalación de Equipo Sumergible "} 
                texto={"Servicio especializado que permite la instalación inicial de bombas sumergibles y otros equipos hidráulicos en pozos profundos. Este proceso es esencial para garantizar el correcto funcionamiento del sistema de bombeo, que debe ser confiable y eficiente en su desempeño para asegurar un suministro de agua constante. La utilización de una grúa telescópica en esta operación es crucial, ya que proporciona la potencia, precisión y alcance necesarios para manipular estos equipos en condiciones de difícil acceso y con cargas pesadas."}
                imagen={extraccionImg}
            />
            <DisplayLeft
                titulo={"Mantenimiento de equipo centrífugo y bombas verticales"} 
                texto={"Ofrecemos mantenimiento especializado para equipos de bombeo centrífugos y bombas verticales, con potencias de 0.5 a 40 hp en voltajes de 115V, 230V y 460V, abarcando motores monofásicos y trifásicos. Trabajamos con marcas líderes como Myers, Franklin Electric, Sta-Rite, Berkeley, Apec, SEI, LEO y Pedrollo, realizando inspecciones detalladas, limpieza, lubricación y pruebas de rendimiento para asegurar un funcionamiento eficiente y prolongar la vida útil del equipo, optimizando su desempeño en aplicaciones industriales y residenciales. "}
                imagen={mantECImg}
            />
            <DisplayRight 
                titulo={"Limpieza mecánica a pozos mecánicos"} 
                texto={"Este proceso incluye técnicas como el cepillado, pistoneado y cubeteo, empleando grúas especiales que permiten una limpieza profunda y exhaustiva del pozo. El cepillado elimina sedimentos y residuos acumulados en las paredes, mientras que el pistoneado ayuda a despejar obstrucciones en el sistema y a mejorar el flujo de agua. Finalmente, el cubeteo extrae el material residual que pueda haber quedado en el fondo del pozo, dejando el sistema libre de impurezas y en óptimas condiciones para operar."}
                imagen={limpiezaImg}
            />
            <DisplayLeft
                titulo={"Perforación de pozos mecánicos"} 
                texto={"Ofrecemos perforación de pozos para extracción de aguas subterráneas, utilizando maquinaria de rotación avanzada con capacidad de perforar hasta 2,000 pies de profundidad y diámetros de hasta 30 pulgadas. Realizamos el trabajo con respeto al entorno, sin afectar árboles, vegetación, quebradas o cuerpos de agua cercanos, y cumplimos con normativas municipales retirando los escombros de manera continua para mantener el área limpia y segura. "}
                imagen={perforacionImg}
            />
            <DisplayRight 
                titulo={"Instalación y mantenimiento a sistemas contra incendio"} 
                texto={"Diseño calculo y planificación de montaje de sistemas contra incendios de acuerdo con las normas y lineamientos NFPA y FM Global, según analistas de riesgo y el tipo de industria a proteger. Utilizamos el software especializado Autosprink para el cálculo hidráulico y dimensionamiento de los sistemas. Somos capaces de planificar y coordinar la logística del suministro de manera que se reduzca significativamente el tiempo en obra, lo cual se refleja en importantes ahorros en el costo total del proyecto, proveemos asesoría y servicio de mantenimiento cumpliendo con normativas NFPA, para cubrir las necesidades según requerimientos de aseguradoras para la industria."}
                imagen={incendioImg}
            />
            <DisplayLeft 
                titulo={"Mantenimiento de paneles de control"} 
                texto={"Ofrecemos instalación y mantenimiento especializado para paneles de control eléctricos VFD y soft starters, diseñados para operar equipos sumergibles con potencias de 5 a 250 hp. Nuestro servicio garantiza un rendimiento óptimo y eficiente del equipo al gestionar adecuadamente la energía y prolongar la vida útil de los motores."}
                imagen={panelesImg}
            />
            <DisplayRight
                titulo={"Aforo / Pruebas de bombeo"} 
                texto={"Nuestro servicio de aforo o prueba de bombeo está diseñado para determinar la producción de un pozo en galones por minuto (GPM), lo que nos permite calcular la potencia necesaria del equipo de bombeo para aprovechar de manera óptima dicha producción. Esta prueba implica la instalación de un equipo sumergible, el cual opera durante un período de 12 a 36 horas. Durante este tiempo, se evalúa la capacidad del pozo, así como los niveles dinámico y estático del agua, proporcionando datos esenciales para el cálculo preciso del equipo de bombeo a instalar. Así garantizamos una solución efectiva y eficiente para satisfacer las necesidades de suministro de agua de nuestros clientes."}
                imagen={bombeoImg}
            />
            <DisplayLeft 
                titulo={"Inspección con Cámara"} 
                texto={"Para determinar el estado del pozo mecánico, realizamos una evaluación exhaustiva que incluye el análisis de diversas características esenciales. Esto abarca la medición de la profundidad del pozo, así como la inspección del estado interno mediante la introducción de una cámara de video especializada. Esta tecnología nos permite identificar obstrucciones o daños que puedan estar afectando la eficiencia del pozo. También verificamos el estado de la rejilla y ofrecemos una vista lateral de 360° de la tubería, asegurando un diagnóstico completo que nos ayude a implementar las soluciones necesarias para optimizar el funcionamiento del pozo."}
                imagen={camaraImg}
            />
            <DisplayRight
                titulo={"Limpieza de pozos mecánicos con compresores"} 
                texto={"Ofrecemos un servicio especializado de limpieza de pozos mecánicos utilizando compresores de alta presión, diseñado para eliminar sedimentos, residuos y obstrucciones que pueden afectar el rendimiento del pozo. Este método efectivo inyecta aire comprimido a alta presión, lo que permite desatascar y limpiar de manera eficiente las paredes y el fondo del pozo, restaurando el flujo de agua y mejorando la calidad del suministro."}
                imagen={limpiezaCImg}
            />
            <DisplayLeft 
                titulo={"Servicio Técnico Hidroneumáticos a Bombas"} 
                texto={"Brindamos servicio técnico especializado para sistemas hidroneumáticos, asegurando el mantenimiento, reparación y optimización de bombas utilizadas en estos sistemas. Nuestro equipo verifica el estado de los componentes, ajusta la presión y realiza pruebas de rendimiento para garantizar un suministro de agua constante y eficiente. Con nuestro servicio técnico, las bombas hidroneumáticas operan de manera confiable, prolongando su vida útil y mejorando la eficiencia del sistema hidráulico en general."}
                imagen={hidroNeuImg}
            />
            <h3 className='subtitle'>¿Quieres solicitar un servicio?</h3>
            {showForms ? (
                <FormsSer type={1} setShowForms={setShowForms} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>
            ) : (
                <div className="fill_the_service" onClick={() => setShowForms(true)}>
                <p>Llena un formulario con tu información</p>
                <AiFillEdit color="black" size={25} />
                </div>
            )}
            <h3 className='subtitle'>Contacténos</h3>
            <p className='textservice'>
                <strong>Dirección:</strong> 10 Calle 5-28 Zona 6, Villa Nueva, Residenciales Catalina
            </p>
            <p className='textservice'>
                <strong>Teléfono:</strong> <span>(502) 6670-3030 / 6631-1845</span>
            </p>
            <p className='textservice'>
                <strong>Correo:</strong> <span>ventas@aguatesa.com</span>
            </p>
            <p className='textservice'>
             ventas2@aguatesa.com
            </p>
            <StateCard message={successMessage} isOpen={!!successMessage} type={1}/>
            <StateCard message={errorMessage} isOpen={!!errorMessage} type={2}/>
             
      </main>
    );
}

export default NuestrosServicios
