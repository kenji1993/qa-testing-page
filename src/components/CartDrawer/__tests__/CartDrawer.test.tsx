import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CartDrawer from '../src/CartDrawer';
import { useCartStore } from '../../../store/useCartStore';

beforeEach(() => {
    useCartStore.setState({ items: [], isDrawerOpen: false });
});

describe('CartDrawer', () => {
    it('should be hidden by default', () => {
        render(<CartDrawer />);
        const drawer = screen.getByTestId('cart-drawer');
        expect(drawer).toHaveClass('translate-x-full');
    });

    it('should be visible when isDrawerOpen is true', () => {
        useCartStore.setState({ isDrawerOpen: true });
        render(<CartDrawer />);
        const drawer = screen.getByTestId('cart-drawer');
        expect(drawer).toHaveClass('translate-x-0');
    });

    it('should show empty state when there are no items', () => {
        useCartStore.setState({ isDrawerOpen: true });
        render(<CartDrawer />);
        expect(screen.getByTestId('cart-empty-state')).toBeInTheDocument();
    });

    it('should show item list when there are products in the cart', () => {
        useCartStore.setState({
            isDrawerOpen: true,
            items: [
                { id: '1', name: 'Ojo de Bife', description: '', price: 4200, imageUrl: '', category: 'Carnes', quantity: 2 },
            ],
        });
        render(<CartDrawer />);
        expect(screen.getByTestId('cart-items-list')).toBeInTheDocument();
        expect(screen.getByTestId('cart-item-1')).toBeInTheDocument();
    });

    it('should display the correct total', () => {
        useCartStore.setState({
            isDrawerOpen: true,
            items: [
                { id: '1', name: 'Ojo de Bife', description: '', price: 4200, imageUrl: '', category: 'Carnes', quantity: 2 },
            ],
        });
        render(<CartDrawer />);
        expect(screen.getByTestId('cart-total')).toBeInTheDocument();
    });

    it('should show the WhatsApp button when there are items', () => {
        useCartStore.setState({
            isDrawerOpen: true,
            items: [
                { id: '1', name: 'Ojo de Bife', description: '', price: 4200, imageUrl: '', category: 'Carnes', quantity: 1 },
            ],
        });
        render(<CartDrawer />);
        expect(screen.getByTestId('whatsapp-order-btn')).toBeInTheDocument();
    });

    it('should close the drawer when the close button is clicked', () => {
        useCartStore.setState({ isDrawerOpen: true });
        render(<CartDrawer />);
        fireEvent.click(screen.getByTestId('close-cart-btn'));
        expect(useCartStore.getState().isDrawerOpen).toBe(false);
    });

    it('should remove an item when the remove button is clicked', () => {
        useCartStore.setState({
            isDrawerOpen: true,
            items: [
                { id: '1', name: 'Ojo de Bife', description: '', price: 4200, imageUrl: '', category: 'Carnes', quantity: 1 },
            ],
        });
        render(<CartDrawer />);
        fireEvent.click(screen.getByTestId('remove-item-btn-1'));
        expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('should increment the quantity when the + button is clicked', () => {
        useCartStore.setState({
            isDrawerOpen: true,
            items: [
                { id: '1', name: 'Ojo de Bife', description: '', price: 4200, imageUrl: '', category: 'Carnes', quantity: 1 },
            ],
        });
        render(<CartDrawer />);
        fireEvent.click(screen.getByTestId('increase-qty-btn-1'));
        expect(useCartStore.getState().items[0].quantity).toBe(2);
    });
});
