import React from 'react'
import style from './filterContainer.module.css'

const FilterContainer = ({ 
    selectedCategories, 
    selectedMaterials, 
    handleCategoryToggle, 
    handleMaterialToggle 
}) => {
    return (
        <div className={style['filter-container']}>
            <h3 className={style['filter-title']}>IDEAL FOR</h3>
            <div className={style['filter-options']}>
                <label className={style['filter-checkbox']}>
                    <input
                        type="checkbox"
                        checked={selectedCategories.length === 0}
                        onChange={() => handleCategoryToggle('All')}
                    />
                    <span>All</span>
                </label>
                <label className={style['filter-checkbox']}>
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes('Men')}
                        onChange={() => handleCategoryToggle('Men')}
                    />
                    <span>Men</span>
                </label>
                <label className={style['filter-checkbox']}>
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes('Women')}
                        onChange={() => handleCategoryToggle('Women')}
                    />
                    <span>Women</span>
                </label>
                <label className={style['filter-checkbox']}>
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes('Baby & Kids')}
                        onChange={() => handleCategoryToggle('Baby & Kids')}
                    />
                    <span>Baby & Kids</span>
                </label>
            </div>

            <h3 className={style['filter-title']}>MATERIALS</h3>
            <div className={style['filter-options']}>
                <label className={style['filter-checkbox']}>
                    <input
                        type="checkbox"
                        checked={selectedMaterials.length === 0}
                        onChange={() => handleMaterialToggle('All')}
                    />
                    <span>All</span>
                </label>
                <label className={style['filter-checkbox']}>
                    <input
                        type="checkbox"
                        checked={selectedMaterials.includes('electronics')}
                        onChange={() => handleMaterialToggle('electronics')}
                    />
                    <span>Electronics</span>
                </label>
                <label className={style['filter-checkbox']}>
                    <input
                        type="checkbox"
                        checked={selectedMaterials.includes('jewelery')}
                        onChange={() => handleMaterialToggle('jewelery')}
                    />
                    <span>Jewelery</span>
                </label>
            </div>
        </div>
    )
}

export default FilterContainer
