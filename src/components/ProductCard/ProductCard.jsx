import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../context/store'
import style from './productCard.module.css'

const ProductCard = ({ product }) => {
    const { id, title, price, image } = product || { id: 0, title: 'Product Name', price: 0, image: '' }
    const navigate = useNavigate()
    const { isUserSignedIn, toggleFavorite, isFavorite } = useStore()

    const handleFavoriteClick = (e) => {
        e.stopPropagation() // Prevent card click
        toggleFavorite(product)
    }

    const handleCardClick = () => {
        navigate(`/product/${id}`)
    }

    return (
        <div className={style.card} onClick={handleCardClick}>


            <div className={style['image-container']}>
                {image && <img src={image} alt={title} className={style.image} />}
            </div>

            <div className={style.details}>
                <h3 className={style.name}>{title}</h3>
                <div className={style['price-fav-container']}>
                    {isUserSignedIn ? (
                        <p className={style.price}>${price}</p>
                    ) : (
                        <p className={style.price}><span><a href="/signin">Sign in</a></span> or create to see the price</p>
                    )}
                    <button 
                        className={style['favorite-btn']} 
                        aria-label="Add to favorites" 
                        onClick={handleFavoriteClick}
                    >
                        <img src={isFavorite(id) ? "/fav-filled.svg" : "/fav.svg"} alt="Favorite" />
                    </button>

                </div>

            </div>
        </div>
    )
}

export default ProductCard
