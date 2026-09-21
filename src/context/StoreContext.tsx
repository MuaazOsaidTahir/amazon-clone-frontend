import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Product, User } from '../data/types';
import { checkUserStatus, fetchCategories } from '../utils/api';
import { useSearchParams } from 'react-router-dom';

export type CartItem = {
  product: Product;
  quantity: number;
};

type Cart = {
  [key: string]: CartItem
}

type StoreContextValue = {
  cart: Cart;
  cartCount: number;
  addToCart: (product: Product) => void;
  allCategories: string[];
  setallCategories: (categories: string[]) => void;
  removeFromCart: (product: Product) => void;
  user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>>,
  toastRef: React.RefObject<any>
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(JSON.parse(localStorage.getItem('cart') || '{}'));
  const [allCategories, setallCategories] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null)
  const [params, setSearchParams] = useSearchParams()
  const toastRef = useRef<any>(null)
  // const [wishList, setwishList] = useState(JSON.parse(localStorage.getItem('wishList') || '{}'))
  const firstFetch = useRef(true)
  const loginFetch = useRef(true)

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev[product._id];
      return { ...prev, [product._id]: existing ? { product, quantity: existing.quantity + 1 } : { product, quantity: 1 } };
    });
  };

  const removeFromCart = (product: Product) => {
    setCart((prev) => {
      const current = prev[product._id];
      if (!current) return prev;

      const nextQty = current.quantity - 1;

      if (nextQty <= 0) {
        const { [product._id]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [product._id]: { ...current, quantity: nextQty },
      };
    });
  };

  const cartCount = useMemo(
    () => {
      localStorage.setItem('cart', JSON.stringify(cart));
      return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)
    },
    [cart],
  );

  useEffect(() => {
    const type = params.get("order")
    if (type === "success") {
      toastRef.current.show({
        message: "Ordered Successfully",
        type: 'success',
        duration: 3000,
      })
      setCart({});
      setSearchParams({})
    } else if (type === "cancel") {
      toastRef.current.show({
        message: "Unable to complete the checkout, if you have issues kindly contact us",
        type: 'error',
        duration: 3000,
      })
      setSearchParams({})
    }
  }, [params])

  useEffect(() => {
    if (loginFetch.current) {
      (async () => {
        const user = await checkUserStatus()
        if (user?.user) {
          setUser(user?.user);
        }
      })()
      loginFetch.current = false;
    }
  }, [])

  useEffect(() => {
    if (firstFetch.current) {
      (async () => {
        const res = await fetchCategories();
        setallCategories(res?.categories);
      })()
      firstFetch.current = false;
    }
  }, []);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      addToCart,
      allCategories, setallCategories, removeFromCart,
      user, setUser, toastRef
    }),
    [cart, cartCount, allCategories, user],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return ctx;
}
