import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { useAddToCart } from '../src/useAddToCart';
import { useCartStore } from '../../../store/useCartStore';

const mockProduct = {
    id: '1',
    name: 'Ojo de Bife',
    description: 'Corte premium',
    price: 4200,
    imageUrl: '',
    category: 'Carnes',
};

beforeEach(() => {
    useCartStore.setState({ items: [], isDrawerOpen: false });
    jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

describe('useAddToCart', () => {
    it('should return added as false initially', () => {
        const { result } = renderHook(() => useAddToCart(mockProduct));
        expect(result.current.added).toBe(false);
    });

    it('should return quantity as 0 when product is not in cart', () => {
        const { result } = renderHook(() => useAddToCart(mockProduct));
        expect(result.current.quantity).toBe(0);
    });

    it('should reflect quantity from the store when product is in cart', () => {
        useCartStore.setState({ items: [{ ...mockProduct, quantity: 3 }] });
        const { result } = renderHook(() => useAddToCart(mockProduct));
        expect(result.current.quantity).toBe(3);
    });

    it('should set added to true when handleAdd is called', () => {
        const { result } = renderHook(() => useAddToCart(mockProduct));
        act(() => { result.current.handleAdd(); });
        expect(result.current.added).toBe(true);
    });

    it('should add the product to the cart store when handleAdd is called', () => {
        const { result } = renderHook(() => useAddToCart(mockProduct));
        act(() => { result.current.handleAdd(); });
        expect(useCartStore.getState().items).toHaveLength(1);
        expect(useCartStore.getState().items[0].id).toBe(mockProduct.id);
    });

    it('should reset added to false after 1200ms', () => {
        const { result } = renderHook(() => useAddToCart(mockProduct));
        act(() => { result.current.handleAdd(); });
        expect(result.current.added).toBe(true);
        act(() => { jest.advanceTimersByTime(1200); });
        expect(result.current.added).toBe(false);
    });
});
