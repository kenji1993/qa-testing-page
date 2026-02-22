import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from '../src/Footer';
import { RESTAURANT_NAME } from '../../../data/products';

describe('Footer', () => {
    it('should render the footer', () => {
        render(<Footer />);
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('should display the restaurant name', () => {
        render(<Footer />);
        // Múltiples instancias del nombre son esperables (logo + copyright)
        const matches = screen.getAllByText(RESTAURANT_NAME);
        expect(matches.length).toBeGreaterThan(0);
    });

    it('should display the WhatsApp link in the footer', () => {
        render(<Footer />);
        expect(screen.getByTestId('footer-whatsapp-link')).toBeInTheDocument();
    });

    it('should display the restaurant address', () => {
        render(<Footer />);
        expect(screen.getByText(/Av. Corrientes/i)).toBeInTheDocument();
    });

    it('should have the correct href attribute on the WhatsApp link', () => {
        render(<Footer />);
        const link = screen.getByTestId('footer-whatsapp-link');
        expect(link).toHaveAttribute('href', expect.stringContaining('wa.me'));
    });
});
