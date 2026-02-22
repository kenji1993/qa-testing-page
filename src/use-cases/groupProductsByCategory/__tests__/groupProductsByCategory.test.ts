import '@testing-library/jest-dom';
import { groupProductsByCategory } from '../src/groupProductsByCategory';
import type { Product } from '../../../types';

const mockProducts: Product[] = [
    { id: '1', name: 'Ojo de Bife', description: '', price: 4200, imageUrl: '', category: 'Carnes' },
    { id: '2', name: 'Asado', description: '', price: 3800, imageUrl: '', category: 'Carnes' },
    { id: '3', name: 'Provoleta', description: '', price: 1800, imageUrl: '', category: 'Entradas' },
    { id: '4', name: 'Malbec', description: '', price: 2500, imageUrl: '', category: 'Bebidas' },
];

describe('groupProductsByCategory', () => {
    it('should return one group per unique category', () => {
        const result = groupProductsByCategory(mockProducts);
        expect(result).toHaveLength(3);
    });

    it('should preserve insertion order of categories', () => {
        const result = groupProductsByCategory(mockProducts);
        expect(result[0].category).toBe('Carnes');
        expect(result[1].category).toBe('Entradas');
        expect(result[2].category).toBe('Bebidas');
    });

    it('should place products into the correct group', () => {
        const result = groupProductsByCategory(mockProducts);
        const carnes = result.find((g) => g.category === 'Carnes');
        expect(carnes?.products).toHaveLength(2);
        expect(carnes?.products.map((p) => p.id)).toEqual(['1', '2']);
    });

    it('should return an empty array when given no products', () => {
        const result = groupProductsByCategory([]);
        expect(result).toHaveLength(0);
    });

    it('should handle a list where every product has a different category', () => {
        const result = groupProductsByCategory(mockProducts.map((p) => ({ ...p, category: p.id })));
        expect(result).toHaveLength(mockProducts.length);
        result.forEach((group) => expect(group.products).toHaveLength(1));
    });
});
