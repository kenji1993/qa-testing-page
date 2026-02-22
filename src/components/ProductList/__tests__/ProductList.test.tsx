import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductList from '../src/ProductList';
import { PRODUCTS } from '../../../data/products';
import { useCartStore } from '../../../store/useCartStore';

beforeEach(() => {
    useCartStore.setState({ items: [], isDrawerOpen: false });
});

describe('ProductList', () => {
    it('should render the product list section', () => {
        render(<ProductList />);
        expect(screen.getByTestId('product-list')).toBeInTheDocument();
    });

    it('should render all product cards', () => {
        render(<ProductList />);
        PRODUCTS.forEach((product) => {
            expect(screen.getByTestId(`product-card-${product.id}`)).toBeInTheDocument();
        });
    });

    it('should display category headings', () => {
        render(<ProductList />);
        const categories = [...new Set(PRODUCTS.map((p) => p.category))];
        categories.forEach((cat) => {
            expect(screen.getByTestId(`category-heading-${cat.toLowerCase()}`)).toBeInTheDocument();
        });
    });

    it('should render the section title "Lo mejor de la parrilla"', () => {
        render(<ProductList />);
        expect(screen.getByText('Lo mejor de la parrilla')).toBeInTheDocument();
    });
});
