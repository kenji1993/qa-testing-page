import React from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
    const categories = [...new Set(PRODUCTS.map((p) => p.category))];

    return (
        <section
            data-testid="product-list"
            className="mx-auto max-w-7xl px-4 py-12 sm:px-6"
        >
            {/* Section heading */}
            <div className="mb-10 text-center">
                <span className="text-sm uppercase tracking-widest text-[#f5a623]">
                    Nuestra carta
                </span>
                <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                    Lo mejor de la parrilla
                </h2>
                <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#c8102e]" />
            </div>

            {/* Grouped by category */}
            {categories.map((category) => (
                <div key={category} className="mb-12">
                    <h3
                        data-testid={`category-heading-${category.toLowerCase()}`}
                        className="mb-6 text-lg font-semibold uppercase tracking-widest text-[#aaaaaa]"
                    >
                        — {category}
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {PRODUCTS.filter((p) => p.category === category).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default ProductList;
