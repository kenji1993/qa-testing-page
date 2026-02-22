import { useEffect } from 'react';
import { useCartStore } from '../../../store/useCartStore';

/**
 * Encapsulates all CartDrawer state selectors plus side-effects:
 * - body scroll lock when drawer is open
 * - close on Escape key
 */
export function useCartDrawer() {
    const items = useCartStore((state) => state.items);
    const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
    const closeDrawer = useCartStore((state) => state.closeDrawer);
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const clearCart = useCartStore((state) => state.clearCart);
    const getTotal = useCartStore((state) => state.getTotal);

    const total = getTotal();

    // Lock body scroll when drawer is open
    useEffect(() => {
        document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isDrawerOpen]);

    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [closeDrawer]);

    return {
        items,
        isDrawerOpen,
        total,
        closeDrawer,
        removeItem,
        updateQuantity,
        clearCart,
    };
}
