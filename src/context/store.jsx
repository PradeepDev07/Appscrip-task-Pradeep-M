import React, { createContext, useState, useContext } from 'react'
import Cookies from 'js-cookie'

const StoreContext = createContext()

export const useStore = () => {
    const context = useContext(StoreContext)
    if (!context) {
        throw new Error('useStore must be used within StoreProvider')
    }
    return context
}

export const StoreProvider = ({ children }) => {
    const [isUserSignedIn, setIsUserSignedIn] = useState(() => {
        return !!Cookies.get('token')
    })
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites') || '[]')
    })


    // Favorites management
    const addToFavorites = (product) => {
        setFavorites(prev => {
            const updated = [...prev, product]
            localStorage.setItem('favorites', JSON.stringify(updated))
            return updated
        })
    }

    const removeFromFavorites = (productId) => {
        setFavorites(prev => {
            const updated = prev.filter(item => item.id !== productId)
            localStorage.setItem('favorites', JSON.stringify(updated))
            return updated
        })
    }

    const toggleFavorite = (product) => {
        setFavorites(prev => {
            const isCurrentlyFavorite = prev.some(item => item.id === product.id)
            let updated

            if (isCurrentlyFavorite) {
                updated = prev.filter(item => item.id !== product.id)
            } else {
                updated = [...prev, product]
            }

            localStorage.setItem('favorites', JSON.stringify(updated))
            return updated
        })
    }

    const isFavorite = (productId) => {
        return favorites.some(item => item.id === productId)
    }

    const clearAllFavorites = () => {
        setFavorites([])
        localStorage.setItem('favorites', JSON.stringify([]))
    }



    // Auth management
    const signIn = (token) => {
        Cookies.set('token', token, { expires: 7 })
        setIsUserSignedIn(true)
    }

    const signOut = () => {
        Cookies.remove('token')
        setIsUserSignedIn(false)
    }

    const value = {
        // Auth
        isUserSignedIn,
        signIn,
        signOut,

        // Favorites
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        clearAllFavorites,


    }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContext
