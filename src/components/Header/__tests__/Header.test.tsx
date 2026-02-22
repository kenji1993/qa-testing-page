import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../src/Header';

// Zustand store is real — reset between tests
import { useCartStore } from '../../../store/useCartStore';

beforeEach(() => {
    useCartStore.setState({ items: [], isDrawerOpen: false });
});

describe('Header', () => {
    it('should render the restaurant name', () => {
        render(<Header />);
        expect(screen.getByTestId('header-logo')).toBeInTheDocument();
        expect(screen.getByText('La Parrilla del Gaucho')).toBeInTheDocument();
    });

    it('should display the cart button', () => {
        render(<Header />);
        expect(screen.getByTestId('cart-icon-btn')).toBeInTheDocument();
    });

    it('should not show the badge when the cart is empty', () => {
        render(<Header />);
        expect(screen.queryByTestId('cart-item-count')).not.toBeInTheDocument();
    });

    it('should show the badge with the correct count when there are items in the cart', () => {
        useCartStore.setState({
            items: [
                { id: '1', name: 'Ojo de Bife', description: '', price: 4200, imageUrl: '', category: 'Carnes', quantity: 3 },
            ],
        });
        render(<Header />);
        expect(screen.getByTestId('cart-item-count')).toHaveTextContent('3');
    });

    it('should open the drawer when the cart button is clicked', () => {
        render(<Header />);
        fireEvent.click(screen.getByTestId('cart-icon-btn'));
        expect(useCartStore.getState().isDrawerOpen).toBe(true);
    });
});
