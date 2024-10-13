import './services.css'
import FormsSer from '../../components/forms/formsSer';

function Perforacion() {

    return (
        <main className="main-content-ser">
            <h2>Perforación de Pozos</h2>
            <p className="textservice">
                Consiste en la perforación del terreno y trituración de la roca, para la extracción de aguas subterráneas.
                Contamos con maquinaria de rotación totalmente operativas, con una capacidad de perforar hasta de 1,000 pies 
                de profundidad y una ampliación hasta de 30" de diámetro. Con la perforación de los pozos no se ven afectados 
                árboles, plantas de ningún tipo, quebradas, ríos, etc. Las áreas Municipales tampoco se ven afectadas puesto 
                a que los escombros son retirados de la obra a medida que se vayan produciendo.       
            </p>
            <p className='textservice'>
                Una vez realizados los trabajos de perforación se verifican las muestras, se corrobora que existen posibilidades 
                de buenos acuíferos y se procede al entubado o encamisado y engravado del pozo; posteriormente la explotación del 
                mismo.   
            </p>
            <div className='imagescontainer'>
                <img className='per' src="https://www.aguatesa.com/images/20140709_101122.jpg" alt="Imagen Servicios Mant 1"/>
            </div>
            <h3 className='subtitle'>Solicitud de Servicios</h3>
            <FormsSer type={1}/>
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
      </main>
    );
}

export default Perforacion