import './card.css'

function Card({ nombre, precio, imagen }) {
    return (
        <li>
            <img src={imagen} alt="Descripción de la imagen" className='small' />
            <div className="titulo">{nombre}</div>
            <div className="precio">{precio}</div>
            <button className='moreinfo'> Más Información </button>
        </li>
    );
}

export default Card 