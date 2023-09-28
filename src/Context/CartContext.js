import { createContext, useState, useContext, useEffect } from 'react'

const CartContext = createContext({})

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || [])

    const increaseItemQuantity = (productId) => {
        setCartItems(prevCart => {
            if (prevCart.find(item => item.productId === productId) == null) {
                return [...prevCart, { productId, quantity: 1 }]
            } else {
                return prevCart.map(item => {
                    if (item.productId === productId) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseItemQuantity = (productId) => {
        setCartItems(prevCart => {
            if (prevCart.find(item => item.productId === productId)) {
                return prevCart.map(item => {
                    if ((item.productId === productId) && (item.quantity > 1)) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    const removeItem = (productId) => {
        setCartItems(prevCart => {
            if (prevCart.find(item => item.productId === productId)) {
                return prevCart.filter(item => item.productId !== productId)
            }
        })
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    const getItemQuantity = (productId) => {
        return cartItems.find(item => item.productId === productId)?.quantity || 0
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