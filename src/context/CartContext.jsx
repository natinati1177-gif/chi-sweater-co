import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cartCount, setCartCount] = useState(0)

  const refreshCart = async () => {
    if (!user) { setCartCount(0); return }

    const { data } = await supabase
      .from('cart_items')
      .select('quantity')
      .eq('user_id', user.id)

    if (data) setCartCount(data.reduce((sum, item) => sum + item.quantity, 0))
  }

  useEffect(() => { refreshCart() }, [user])

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
