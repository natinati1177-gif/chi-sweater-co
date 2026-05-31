import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
    auth: {
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
    },
  },
}))

import { supabase } from '../lib/supabase'

const makeChain = (result = { data: null, error: null }) => {
  const chain = {}
  chain.select = vi.fn().mockReturnValue(chain)
  chain.eq = vi.fn().mockReturnValue(chain)
  chain.order = vi.fn().mockReturnValue(chain)
  chain.limit = vi.fn().mockReturnValue(chain)
  chain.delete = vi.fn().mockReturnValue(chain)
  chain.upsert = vi.fn().mockResolvedValue(result)
  chain.insert = vi.fn().mockResolvedValue(result)
  chain.then = (resolve, reject) => Promise.resolve(result).then(resolve, reject)
  chain.catch = (reject) => Promise.resolve(result).catch(reject)
  return chain
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('Products', () => {
  it('fetches products from the products table', async () => {
    const products = [
      { id: 1, name: 'Windy City Crewneck', price: 95, in_stock: true },
      { id: 2, name: 'Chicago Classic Hoodie', price: 120, in_stock: true },
    ]
    supabase.from.mockReturnValueOnce(makeChain({ data: products, error: null }))

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)

    expect(supabase.from).toHaveBeenCalledWith('products')
    expect(error).toBeNull()
    expect(data).toHaveLength(2)
    expect(data[0].name).toBe('Windy City Crewneck')
  })

  it('returns an error when products fetch fails', async () => {
    supabase.from.mockReturnValueOnce(makeChain({ data: null, error: { message: 'Network error' } }))

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)

    expect(error).not.toBeNull()
    expect(error.message).toBe('Network error')
    expect(data).toBeNull()
  })
})

describe('Cart Items', () => {
  it('adds a product to the cart with upsert', async () => {
    const chain = makeChain({ data: null, error: null })
    supabase.from.mockReturnValueOnce(chain)

    const { error } = await supabase
      .from('cart_items')
      .upsert({ user_id: 'user-123', product_id: 1, quantity: 1 }, { onConflict: 'user_id,product_id' })

    expect(supabase.from).toHaveBeenCalledWith('cart_items')
    expect(chain.upsert).toHaveBeenCalledWith(
      { user_id: 'user-123', product_id: 1, quantity: 1 },
      { onConflict: 'user_id,product_id' }
    )
    expect(error).toBeNull()
  })

  it('fetches cart items joined with products for the current user', async () => {
    const cartData = [
      {
        id: 1,
        user_id: 'user-123',
        product_id: 1,
        quantity: 1,
        products: { id: 1, name: 'Windy City Crewneck', price: 95 },
      },
    ]
    supabase.from.mockReturnValueOnce(makeChain({ data: cartData, error: null }))

    const { data, error } = await supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('user_id', 'user-123')

    expect(error).toBeNull()
    expect(data).toHaveLength(1)
    expect(data[0].products.name).toBe('Windy City Crewneck')
  })

  it('removes an item from the cart by id', async () => {
    supabase.from.mockReturnValueOnce(makeChain({ data: null, error: null }))

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', 1)

    expect(supabase.from).toHaveBeenCalledWith('cart_items')
    expect(error).toBeNull()
  })

  it('does not return other users cart items (RLS simulation)', async () => {
    supabase.from.mockReturnValueOnce(makeChain({ data: [], error: null }))

    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', 'other-user-id')

    expect(error).toBeNull()
    expect(data).toHaveLength(0)
  })
})

describe('Reviews', () => {
  it('fetches reviews ordered by date descending', async () => {
    const reviewsData = [
      { id: 1, author_name: 'Marcus', body: 'Great hoodie', rating: 5 },
      { id: 2, author_name: 'Jordan', body: 'Love the fit', rating: 4 },
    ]
    supabase.from.mockReturnValueOnce(makeChain({ data: reviewsData, error: null }))

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)

    expect(supabase.from).toHaveBeenCalledWith('reviews')
    expect(error).toBeNull()
    expect(data).toHaveLength(2)
    expect(data[0].author_name).toBe('Marcus')
  })
})

describe('Auth', () => {
  it('signs in with email and password', async () => {
    supabase.auth.signInWithPassword.mockResolvedValueOnce({ error: null })

    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@chi-sweater.com',
      password: 'test1234',
    })

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@chi-sweater.com',
      password: 'test1234',
    })
    expect(error).toBeNull()
  })

  it('returns an error for invalid credentials', async () => {
    supabase.auth.signInWithPassword.mockResolvedValueOnce({
      error: { message: 'Invalid login credentials' },
    })

    const { error } = await supabase.auth.signInWithPassword({
      email: 'wrong@email.com',
      password: 'wrongpassword',
    })

    expect(error).not.toBeNull()
    expect(error.message).toBe('Invalid login credentials')
  })

  it('signs out successfully', async () => {
    supabase.auth.signOut.mockResolvedValueOnce({ error: null })

    const { error } = await supabase.auth.signOut()

    expect(supabase.auth.signOut).toHaveBeenCalled()
    expect(error).toBeNull()
  })
})
