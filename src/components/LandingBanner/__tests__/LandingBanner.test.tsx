import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LandingBanner from '../src/LandingBanner';
import { useCartStore } from '../../../store/useCartStore';
import { RESTAURANT_NAME } from '../../../data/products';

beforeEach(() => {
    useCartStore.setState({ items: [], isDrawerOpen: false });
});

describe('LandingBanner', () => {
    it('should render the hero section', () => {
        render(<LandingBanner />);
        expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    });

    it('should display the restaurant name', () => {
        render(<LandingBanner />);
        expect(screen.getByText(RESTAURANT_NAME)).toBeInTheDocument();
    });

    it('should display the "Ver la carta" CTA button', () => {
        render(<LandingBanner />);
        expect(screen.getByTestId('hero-see-menu-btn')).toBeInTheDocument();
        expect(screen.getByTestId('hero-see-menu-btn')).toHaveTextContent('Ver la carta');
    });

    it('should not show the "Mi pedido" button when the cart is empty', () => {
        render(<LandingBanner />);
        expect(screen.queryByTestId('hero-view-cart-btn')).not.toBeInTheDocument();
    });

    it('should show the "Mi pedido" button when there are items in the cart', () => {
        useCartStore.setState({
            items: [{ id: '1', name: 'Test', description: '', price: 100, imageUrl: '', category: 'Test', quantity: 1 }],
        });
        render(<LandingBanner />);
        expect(screen.getByTestId('hero-view-cart-btn')).toBeInTheDocument();
    });
});
