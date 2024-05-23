import './card.css'

function Card({ nombre, precio, imagen, onMoreInfoClick }) {
    return (
        <li>
            <img src={imagen} alt="Descripción de la imagen" className='small' />
            <div className="titulo">{nombre}</div>
            <div className="precio">{precio}</div>
            <button className='moreinfo' onClick={onMoreInfoClick}> Más Información </button>
        </li>
    );
}

export default Card 
