import './card.css'

function Card(){
    return(
        <>
            <li>
                <img src="https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png" alt="Descripción de la imagen" class = 'small'></img>
                <div class="titulo">Producto 1</div>
                <div class="precio">Q20.00</div>
                <button class='moreinfo'> Más Infromación </button>

            </li>
        </>
    )
}

export default Card 