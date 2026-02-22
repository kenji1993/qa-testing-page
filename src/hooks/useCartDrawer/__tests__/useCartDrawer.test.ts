import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { useCartDrawer } from '../src/useCartDrawer';
import { useCartStore } from '../../../store/useCartStore';

beforeEach(() => {
    useCartStore.setState({ items: [], isDrawerOpen: false });
});

describe('useCartDrawer', () => {
    it('should return isDrawerOpen as false by default', () => {
        const { result } = renderHook(() => useCartDrawer());
        expect(result.current.isDrawerOpen).toBe(false);
    });

    it('should reflect store state when drawer is open', () => {
        useCartStore.setState({ isDrawerOpen: true });
        const { result } = renderHook(() => useCartDrawer());
        expect(result.current.isDrawerOpen).toBe(true);
    });

    it('should return an empty items array by default', () => {
        const { result } = renderHook(() => useCartDrawer());
        expect(result.current.items).toHaveLength(0);
    });

    it('should reflect items from the store', () => {
        useCartStore.setState({
            items: [{ id: '1', name: 'Ojo de Bife', description: '', price: 4200, imageUrl: '', category: 'Carnes', quantity: 2 }],
        });
        const { result } = renderHook(() => useCartDrawer());
        expect(result.current.items).toHaveLength(1);
    });

    it('should compute the correct total from items', () => {
        useCartStore.setState({
            items: [{ id: '1', name: 'Ojo de Bife', description: '', price: 4200, imageUrl: '', category: 'Carnes', quantity: 2 }],
        });
        const { result } = renderHook(() => useCartDrawer());
        expect(result.current.total).toBe(8400);
    });

    it('should close the drawer when closeDrawer is called', () => {
        useCartStore.setState({ isDrawerOpen: true });
        const { result } = renderHook(() => useCartDrawer());
        act(() => { result.current.closeDrawer(); });
        expect(useCartStore.getState().isDrawerOpen).toBe(false);
    });

    it('should lock body scroll when drawer opens', () => {
        useCartStore.setState({ isDrawerOpen: true });
        renderHook(() => useCartDrawer());
        expect(document.body.style.overflow).toBe('hidden');
    });

    it('should unset body scroll lock when drawer closes', () => {
        useCartStore.setState({ isDrawerOpen: false });
        renderHook(() => useCartDrawer());
        expect(document.body.style.overflow).toBe('');
    });

    it('should close the drawer when Escape key is pressed', () => {
        useCartStore.setState({ isDrawerOpen: true });
        renderHook(() => useCartDrawer());
        act(() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        });
        expect(useCartStore.getState().isDrawerOpen).toBe(false);
    });
});
