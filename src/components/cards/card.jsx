import './card.css'

function Card({ nombre, precio, imagen, onMoreInfoClick }) {
    return (
        <li className='smallcards'>
            <img src={imagen} alt="Descripción de la imagen" className='small' />
            <div className="titulo">{nombre}</div>
            <div className="precio">Q {precio !== null ? precio.toFixed(2) : "N/A"}</div>
            <button className='moreinfo' onClick={onMoreInfoClick}> Más Información </button>
        </li>
    );
}

export default Card 
