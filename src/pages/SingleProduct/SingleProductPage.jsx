import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { baseURL } from '../../config/url'
import { useStore } from '../../context/store'
import style from './singleProduct.module.css'

const SingleProductPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const { toggleFavorite, isFavorite, addToCart } = useStore()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${baseURL}/products/${id}`)
                const data = await response.json()
                setProduct(data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching product:", error)
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    const handleAddToCart = () => {
        if (product) {
            addToCart(product)
            // You can add a toast notification here
            alert('Product added to cart!')
        }
    }

    if (loading) return <div className={style.loading}>Loading...</div>
    if (!product) return <div className={style.error}>Product not found</div>

    const isProductFavorite = isFavorite(product.id)

    return (
        <main className={style.container}>
            <button className={style.backBtn} onClick={() => navigate('/shop')}>
                ← Back to Shop
            </button>

            <div className={style.productContainer}>
                <div className={style.imageSection}>
                    <img src={product.image} alt={product.title} className={style.productImage} />
                </div>

                <div className={style.detailsSection}>
                    <h1 className={style.title}>{product.title}</h1>

                    <div className={style.rating}>
                        <span className={style.rate}>★ {product.rating.rate}</span>
                        <span className={style.count}>({product.rating.count} reviews)</span>
                    </div>

                    <p className={style.price}>${product.price}</p>

                    <p className={style.description}>{product.description}</p>

                    <div className={style.category}>
                        <span className={style.categoryLabel}>Category:</span>
                        <span className={style.categoryValue}>{product.category}</span>
                    </div>

                    <div className={style.actions}>
                        <button className={style.addToCartBtn} onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                        <button
                            className={`${style.favoriteBtn} ${isProductFavorite ? style.active : ''}`}
                            onClick={() => toggleFavorite(product)}
                        >
                            <img src="/fav.svg" alt="Favorite" />
                            {isProductFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SingleProductPage
