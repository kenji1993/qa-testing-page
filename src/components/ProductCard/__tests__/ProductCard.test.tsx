import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PRODUCTS } from '../../../data/products';
import ProductCard from '../src/ProductCard';
import { useCartStore } from '../../../store/useCartStore';
import userEvent from '@testing-library/user-event';

const mockProduct = PRODUCTS[0]; // Ojo de Bife

beforeEach(() => {
    useCartStore.setState({ items: [], isDrawerOpen: false });
});

describe('ProductCard', () => {
    it('should render the product information correctly', () => {
        render(<ProductCard product={mockProduct} />);

        expect(screen.getByTestId(`product-card-${mockProduct.id}`)).toBeInTheDocument();
        expect(screen.getByTestId(`product-name-${mockProduct.id}`)).toHaveTextContent(mockProduct.name);
        expect(screen.getByTestId(`product-price-${mockProduct.id}`)).toBeInTheDocument();
        expect(screen.getByTestId(`product-description-${mockProduct.id}`)).toHaveTextContent(mockProduct.description);
    });

    it('should display the "Agregar" button with the correct data-testid', () => {
        render(<ProductCard product={mockProduct} />);
        expect(screen.getByTestId(`add-to-cart-btn-${mockProduct.id}`)).toBeInTheDocument();
    });

    it('should add the product to the store when the "Agregar" button is clicked', async () => {
        const user = userEvent.setup();
        render(<ProductCard product={mockProduct} />);

        await user.click(screen.getByTestId(`add-to-cart-btn-${mockProduct.id}`));

        const { items } = useCartStore.getState();
        expect(items).toHaveLength(1);
        expect(items[0].id).toBe(mockProduct.id);
        expect(items[0].quantity).toBe(1);
    });

    it('should increment the quantity if the same product is added twice', async () => {
        const user = userEvent.setup();
        render(<ProductCard product={mockProduct} />);

        const btn = screen.getByTestId(`add-to-cart-btn-${mockProduct.id}`);
        await user.click(btn);
        await user.click(btn);

        const { items } = useCartStore.getState();
        expect(items[0].quantity).toBe(2);
    });

    it('should show the quantity badge when the product is in the cart', () => {
        useCartStore.setState({
            items: [{ ...mockProduct, quantity: 2 }],
        });
        render(<ProductCard product={mockProduct} />);
        expect(screen.getByTestId(`quantity-badge-${mockProduct.id}`)).toHaveTextContent('2');
    });
});
