import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { useCartSummary } from '../src/useCartSummary';
import { useCartStore } from '../../../store/useCartStore';

beforeEach(() => {
    useCartStore.setState({ items: [], isDrawerOpen: false });
});

describe('useCartSummary', () => {
    it('should return totalItems as 0 when cart is empty', () => {
        const { result } = renderHook(() => useCartSummary());
        expect(result.current.totalItems).toBe(0);
    });

    it('should return the correct totalItems count', () => {
        useCartStore.setState({
            items: [
                { id: '1', name: 'Ojo de Bife', description: '', price: 4200, imageUrl: '', category: 'Carnes', quantity: 3 },
                { id: '2', name: 'Provoleta', description: '', price: 1800, imageUrl: '', category: 'Entradas', quantity: 2 },
            ],
        });
        const { result } = renderHook(() => useCartSummary());
        expect(result.current.totalItems).toBe(5);
    });

    it('should open the drawer when openDrawer is called', () => {
        const { result } = renderHook(() => useCartSummary());
        act(() => { result.current.openDrawer(); });
        expect(useCartStore.getState().isDrawerOpen).toBe(true);
    });
});
