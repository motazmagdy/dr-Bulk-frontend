import { createContext, useState, useContext, useEffect } from 'react'

const CartContext = createContext({})

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || [])

    const increaseItemQuantity = (id) => {
        setCartItems(prevCart => {
            if (prevCart.find(item => item.id === id) == null) {
                return [...prevCart, { id, quantity: 1 }]
            } else {
                return prevCart.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseItemQuantity = (id) => {
        setCartItems(prevCart => {
            if (prevCart.find(item => item.id === id)) {
                return prevCart.map(item => {
                    if ((item.id === id) && (item.quantity > 1)) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    const removeItem = (id) => {
        setCartItems(prevCart => {
            if (prevCart.find(item => item.id === id)) {
                return prevCart.filter(item => item.id !== id)
            }
        })
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    const getItemQuantity = (id) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    return (
        <CartContext.Provider value={{ cartItems, getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

export const useCart = () => {
    return useContext(CartContext)
}