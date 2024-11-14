import './services.css'
import React from 'react';

import logoImg from '../../image/logo2.jpg';
import presentacionImg from '../../image/perforacion.jpg';
import historia1 from '../../image/perforacion2.jpg';
import historia2 from '../../image/incendio.jpg';
import historia3 from '../../image/bombeo.jpg';

function QuienesSomos() {
    
    return (
        <main className="main-content-ser">
            <div class="top-banner">
                <div class="image-wrapper">
                    <img class="per-about" src={presentacionImg} alt="Imagen Servicios Mant 1"/>
                </div>
                <div class="quienes-somos">
                    <div class="title-logo">
                        <img class="logo-about" src={logoImg} alt="Imagen Logo Aguatesa 1"/>
                        <h2>¿Quiénes somos?</h2>
                    </div>
                    <p class="textservice">
                        Somos AGUATESA S.A., una empresa guatemalteca especializada en soluciones integrales para la gestión y aprovechamiento eficiente 
                        del agua. Nos dedicamos a la perforación de pozos mecánicos, mantenimiento de estos pozos, venta de equipos de bombeo de 
                        alta calidad, pruebas de bombeo, y ofrecemos servicios técnicos especializados en sistemas hidroneumáticos. Nuestro compromiso es 
                        brindar a nuestros clientes soluciones efectivas que aseguren un suministro de agua confiable y adaptado a sus necesidades.
                    </p>
                    
                </div>
            </div>

            
            <div className='historia'>
                <h3 className='subtitle'>Nuestra Historia</h3>
                <p className='textservice'>
                Con más de 25 años de experiencia comprobable en el sector, en AGUATESA S.A. hemos crecido al lado de nuestros clientes y nos hemos 
                consolidado como un referente en proyectos relacionados con agua. Gracias a nuestro equipo técnico especializado y a nuestro rol 
                como importadores directos, ofrecemos un amplio inventario de equipos de bombeo y repuestos de calidad. Además, contamos con 
                grúas hidráulicas 4x4 y perforadoras de alta capacidad, como la Ingersoll Rand T4W Rotopercusión y Chicago Pneumatic, así 
                como vehículos de apoyo especializados para aforos. Nuestros servicios están disponibles los 365 días del año y 24 horas al día, 
                para responder a cualquier necesidad con equipos y asistencia de primera calidad. 
                </p>
            </div>

            <div className='history-images'>
                <div class="img-historia-wrapper">
                    <img class="img-historia" src={historia1} alt="Imagen Servicios Mant 1"/>
                </div>
                <div class="img-historia-wrapper">
                    <img class="img-historia" src={historia2} alt="Imagen Servicios Mant 1"/>
                </div>
                <div class="img-historia-wrapper">
                    <img class="img-historia" src={historia3} alt="Imagen Servicios Mant 1"/>
                </div>
            </div>
            
            
            <div className='mision-vision-sect'>
                <div className='side-mv'>
                    <h3 className='subtitle'>Misión</h3>
                    <p className='textservice'>
                    Proveer soluciones efectivas para el manejo del agua, con una gama completa de productos y servicios de alto rendimiento en las 
                    áreas donde nos especializamos. Nos esforzamos por brindar un servicio integral, combinando la calidad de nuestros productos y la 
                    experiencia de nuestro equipo para alcanzar la satisfacción y confianza de nuestros clientes.
                    </p>
                </div>
                <div className='side-mv'>
                    <h3 className='subtitle'>Visión</h3>
                    <p className='textservice'>
                    Queremos ser la empresa de referencia en Guatemala en la venta de equipos de bombeo y la prestación de servicios de agua. Trabajamos 
                    para ser una marca reconocida por la excelencia en la atención al cliente, la innovación en soluciones y la confiabilidad, asegurando 
                    que nuestros clientes siempre nos vean como su primera opción.
                    </p>
                </div>
            </div>
            
            <h3 className='subtitle'>Contacténos</h3>
            <p className='textservice'>
                <strong>Dirección:</strong> 10 Calle 5-28 Zona 6, Villa Nueva, Residenciales Catalina
            </p>
            <p className='textservice'>
                <strong>Teléfono:</strong> <span>(502) 6670-3030</span>
            </p>
            <p className='textservice'>
                <strong>Correo:</strong> <span>ventas@aguatesa.com</span>
            </p>
            <p className='textservice'> ventas2@aguatesa.com</p>
      </main>
    );
}

export default QuienesSomos
