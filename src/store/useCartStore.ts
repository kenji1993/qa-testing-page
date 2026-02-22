import { create } from 'zustand';
import type { CartItem, Product } from '../types';

interface CartState {
    items: CartItem[];
    isDrawerOpen: boolean;
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    openDrawer: () => void;
    closeDrawer: () => void;
    getTotal: () => number;
    getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    isDrawerOpen: false,

    addItem: (product: Product) => {
        const { items } = get();
        const existing = items.find((item) => item.id === product.id);
        if (existing) {
            set({
                items: items.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            });
        } else {
            set({ items: [...items, { ...product, quantity: 1 }] });
        }
    },

    removeItem: (productId: string) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
    },

    updateQuantity: (productId: string, quantity: number) => {
        if (quantity < 1) {
            get().removeItem(productId);
            return;
        }
        set({
            items: get().items.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            ),
        });
    },

    clearCart: () => set({ items: [] }),

    openDrawer: () => set({ isDrawerOpen: true }),
    closeDrawer: () => set({ isDrawerOpen: false }),

    getTotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
