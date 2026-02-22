import { useState } from 'react';
import type { Product } from '../../../types';
import { useCartStore } from '../../../store/useCartStore';

const FEEDBACK_DURATION_MS = 1200;

/**
 * Encapsulates the "add to cart + visual feedback" pattern for a single product.
 * Owns the `added` boolean state and the 1.2 s reset timer.
 */
export function useAddToCart(product: Product) {
    const addItem = useCartStore((state) => state.addItem);
    const items = useCartStore((state) => state.items);
    const [added, setAdded] = useState(false);

    const cartItem = items.find((i) => i.id === product.id);
    const quantity = cartItem?.quantity ?? 0;

    const handleAdd = () => {
        addItem(product);
        setAdded(true);
        setTimeout(() => setAdded(false), FEEDBACK_DURATION_MS);
    };

    return { added, handleAdd, quantity };
}
