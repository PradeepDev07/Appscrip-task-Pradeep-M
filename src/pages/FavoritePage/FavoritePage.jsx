import { useNavigate } from 'react-router-dom'
import { useStore } from '../../context/store'
import style from './favoritePage.module.css'
import ProductCard from '../../components/ProductCard/ProductCard'

const FavoritePage = () => {
    const navigate = useNavigate()
    const { favorites, clearAllFavorites } = useStore()

    if (favorites.length === 0) {
        return (
            <main className={style.container}>
                <div className={style.header}>
                    <h1>My Favorites</h1>
                </div>
                <div className={style.emptyState}>
                    <img src="/fav.svg" alt="No favorites" className={style.emptyIcon} />
                    <h2>No favorites yet</h2>
                    <p>Start adding products to your favorites to see them here!</p>
                    <button className={style.shopBtn} onClick={() => navigate('/shop')}>
                        Browse Products
                    </button>
                </div>
            </main>
        )
    }

    return (
        <main className={style.container}>
            <div className={style.header}>
                <h1>My Favorites</h1>
                <div className={style.headerActions}>
                    <span className={style.count}>{favorites.length} items</span>
                    <button className={style.clearBtn} onClick={clearAllFavorites}>
                        Clear All
                    </button>
                </div>
            </div>
            
            <section className={style.productsGrid}>
                {favorites.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product}
                    />
                ))}
            </section>
        </main>
    )
}

export default FavoritePage
