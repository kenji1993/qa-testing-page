import type { Product } from '../../../types';

export interface ProductGroup {
    category: string;
    products: Product[];
}

/**
 * Pure use-case: receives the full product list and returns them
 * grouped by category, preserving insertion order.
 */
export function groupProductsByCategory(products: Product[]): ProductGroup[] {
    const categoryOrder: string[] = [];
    const map: Record<string, Product[]> = {};

    for (const product of products) {
        if (!map[product.category]) {
            map[product.category] = [];
            categoryOrder.push(product.category);
        }
        map[product.category].push(product);
    }

    return categoryOrder.map((category) => ({
        category,
        products: map[category],
    }));
}
