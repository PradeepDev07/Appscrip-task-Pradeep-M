import { useState, useEffect } from 'react'
import { baseURL } from '../../config/url'
import style from './shop.module.css'
import ProductCard from '../../components/Productcard/ProductCard'
import { useSearchParams } from 'react-router-dom'
import Bottom from '../../components/Bottom/Bottom'
import FilterContainer from '../../components/FilterContainer/FilterContainer'
const Shop = () => {

    const [products, setProducts] = useState([])
    const [showSortDropdown, setShowSortDropdown] = useState(false)
    const [sortType, setSortType] = useState('RECOMMENDED')
    const [showFilterDropdown, setShowFilterDropdown] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedMaterials, setSelectedMaterials] = useState([])
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ''


    useEffect(() => {
        const getProducts = async () => {
            const url = `${baseURL}/products`
            try {
                const response = await fetch(url)
                const data = await response.json()
                setProducts(data)
                console.log(data);
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }


        getProducts()
    }, [])


    const getCategoryLabel = (category) => {
        if (category.toLowerCase().includes("men")) return "Men"
        if (category.toLowerCase().includes("women")) return "Women"
        if (category.toLowerCase().includes("kid") || category.toLowerCase().includes("baby")) return "Baby & Kids"
        return category
    }


    const getFilteredProducts = () => {
        let filtered = products


        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }


        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product => {
                const categoryLabel = getCategoryLabel(product.category)
                return selectedCategories.includes(categoryLabel)
            })
        }


        if (selectedMaterials.length > 0) {
            filtered = filtered.filter(product => {
                return selectedMaterials.some(material =>
                    product.category.toLowerCase().includes(material.toLowerCase())
                )
            })
        }

        return filtered
    }


    const getSortedProducts = () => {
        const filteredProducts = getFilteredProducts()
        const productsCopy = [...filteredProducts]

        switch (sortType) {
            case 'RECOMMENDED':
                return productsCopy.sort((a, b) => b.rating.rate - a.rating.rate)
            case 'POPULAR':
                return productsCopy.sort((a, b) => b.rating.count - a.rating.count)
            case 'PRICE: HIGH TO LOW':
                return productsCopy.sort((a, b) => b.price - a.price)
            case 'PRICE: LOW TO HIGH':
                return productsCopy.sort((a, b) => a.price - b.price)
            default:
                return productsCopy
        }
    }

    const handleSortSelect = (option) => {
        setSortType(option)
        setShowSortDropdown(false)
    }

    const handleCategoryToggle = (category) => {
        if (category === 'All') {
            setSelectedCategories([])
        } else {
            setSelectedCategories(prev => {
                if (prev.includes(category)) {
                    return prev.filter(cat => cat !== category)
                } else {
                    return [...prev, category]
                }
            })
        }
    }

    const handleMaterialToggle = (material) => {
        if (material === 'All') {
            setSelectedMaterials([])
        } else {
            setSelectedMaterials(prev => {
                if (prev.includes(material)) {
                    return prev.filter(mat => mat !== material)
                } else {
                    return [...prev, material]
                }
            })
        }
    }

    return (
        <>
        <main>
            <div className={style['heading-container']}>
                <h1>Discover our products</h1>
                <p>Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.</p>
            </div>
            <div className={style['page-container']}>

                {/*sort and filter*/}

                <div className={style['sort-filter-container']}>

                    <div className={style['filter-dropdown-wrapper']}>
                        <div
                            className={style['filter-container-btn']}
                            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                        >
                            <span className="hide">
                                {getSortedProducts().length} Items
                                {searchQuery && ` (searching: "${searchQuery}")`}
                            </span>
                            <h2>FILTER</h2>
                        </div>

                        {showFilterDropdown && (
                            <div className={style['filter-dropdown']}>
                                <FilterContainer
                                    selectedCategories={selectedCategories}
                                    selectedMaterials={selectedMaterials}
                                    handleCategoryToggle={handleCategoryToggle}
                                    handleMaterialToggle={handleMaterialToggle}
                                />
                            </div>
                        )}
                    </div>
                    <div className={style.vl}></div>


                    <div className={style['sort-dropdown-wrapper']}>
                        <div
                            className={style['recommended-container']}
                            onClick={() => setShowSortDropdown(!showSortDropdown)}
                        >
                            <h2>{sortType}</h2>
                            <img src="/down.svg" alt="Sort dropdown arrow" />
                        </div>

                        {showSortDropdown && (
                            <div className={style['sort-dropdown']}>
                                <div
                                    className={style['sort-option']}
                                    onClick={() => handleSortSelect('RECOMMENDED')}
                                >
                                    RECOMMENDED
                                </div>
                                <div
                                    className={style['sort-option']}
                                    onClick={() => handleSortSelect('POPULAR')}
                                >
                                    POPULAR
                                </div>
                                <div
                                    className={style['sort-option']}
                                    onClick={() => handleSortSelect('PRICE: HIGH TO LOW')}
                                >
                                    PRICE: HIGH TO LOW
                                </div>
                                <div
                                    className={style['sort-option']}
                                    onClick={() => handleSortSelect('PRICE: LOW TO HIGH')}
                                >
                                    PRICE: LOW TO HIGH
                                </div>
                            </div>
                        )}
                    </div>
                </div>



                {/*products section*/}
                <div className={style['products-section']}>
                    <div className={style['desktop-filter']}>
                        <FilterContainer
                            selectedCategories={selectedCategories}
                            selectedMaterials={selectedMaterials}
                            handleCategoryToggle={handleCategoryToggle}
                            handleMaterialToggle={handleMaterialToggle}
                        />
                    </div>

                    <section className={style['products-container']}>

                        {
                            getSortedProducts().map(product => <ProductCard key={product.id} product={product} />

                            )
                        }
                    </section>
                </div>


            </div>
        </main>
        <Bottom />
        </>
    )
}

export default Shop