import '@testing-library/jest-dom';
import { buildWhatsAppOrder } from '../src/buildWhatsAppOrder';
import { WHATSAPP_NUMBER, RESTAURANT_NAME } from '../../../data/products';

const mockItems = [
    { id: '1', name: 'Ojo de Bife', description: '', price: 4200, imageUrl: '', category: 'Carnes', quantity: 2 },
    { id: '2', name: 'Provoleta', description: '', price: 1800, imageUrl: '', category: 'Entradas', quantity: 1 },
];
const total = 4200 * 2 + 1800 * 1; // 10200

describe('buildWhatsAppOrder', () => {
    it('should return a URL pointing to the correct WhatsApp number', () => {
        const url = buildWhatsAppOrder(mockItems, total);
        expect(url).toContain(`wa.me/${WHATSAPP_NUMBER}`);
    });

    it('should include the restaurant name in the message', () => {
        const url = buildWhatsAppOrder(mockItems, total);
        const decoded = decodeURIComponent(url.split('?text=')[1]);
        expect(decoded).toContain(RESTAURANT_NAME);
    });

    it('should include each item name and quantity in the message', () => {
        const url = buildWhatsAppOrder(mockItems, total);
        const decoded = decodeURIComponent(url.split('?text=')[1]);
        expect(decoded).toContain('Ojo de Bife x2');
        expect(decoded).toContain('Provoleta x1');
    });

    it('should include the formatted total in the message', () => {
        const url = buildWhatsAppOrder(mockItems, total);
        const decoded = decodeURIComponent(url.split('?text=')[1]);
        expect(decoded).toContain(total.toLocaleString('es-AR'));
    });

    it('should URL-encode the text query parameter', () => {
        const url = buildWhatsAppOrder(mockItems, total);
        expect(url).toContain('?text=');
        // The raw '!' and spaces should be encoded
        expect(url).not.toContain(' ');
    });
});
