import React, { useState } from 'react';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import type { Product } from '../../../types';

import { useCartStore } from '../../../store/useCartStore';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const addItem = useCartStore((state) => state.addItem);
    const items = useCartStore((state) => state.items);
    const [added, setAdded] = useState(false);

    const cartItem = items.find((i) => i.id === product.id);
    const quantity = cartItem?.quantity ?? 0;

    const handleAdd = () => {
        addItem(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    return (
        <article
            data-testid={`product-card-${product.id}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#2e2e2e] bg-[#1e1e1e] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#c8102e]/40 hover:shadow-[0_8px_30px_rgba(200,16,46,0.15)]"
        >
            {/* Image */}
            <div className="relative h-52 overflow-hidden bg-[#111111]">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    data-testid={`product-image-${product.id}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                {/* Category badge */}
                <span className="absolute left-3 top-3 rounded-full bg-[#1e1e1e]/80 px-3 py-1 text-xs font-medium text-[#f5a623] backdrop-blur-sm">
                    {product.category}
                </span>
                {/* Quantity badge if in cart */}
                {quantity > 0 && (
                    <span
                        data-testid={`quantity-badge-${product.id}`}
                        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#c8102e] text-sm font-bold text-white ring-2 ring-[#1e1e1e]"
                    >
                        {quantity}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 p-5">
                <h3
                    data-testid={`product-name-${product.id}`}
                    className="text-lg font-bold leading-tight text-white"
                >
                    {product.name}
                </h3>
                <p
                    data-testid={`product-description-${product.id}`}
                    className="flex-1 text-sm leading-relaxed text-[#aaaaaa]"
                >
                    {product.description}
                </p>

                <div className="flex items-center justify-between gap-3 pt-1">
                    <span
                        data-testid={`product-price-${product.id}`}
                        className="text-xl font-bold text-[#f5a623]"
                    >
                        ${product.price.toLocaleString('es-AR')}
                    </span>

                    <button
                        onClick={handleAdd}
                        data-testid={`add-to-cart-btn-${product.id}`}
                        aria-label={`Agregar ${product.name} al carrito`}
                        className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95 ${added
                            ? 'bg-green-600 text-white'
                            : 'bg-[#c8102e] text-white hover:bg-[#a50d26]'
                            }`}
                    >
                        {added ? (
                            <>
                                <CheckCircle className="h-4 w-4" />
                                ¡Agregado!
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="h-4 w-4" />
                                Agregar
                            </>
                        )}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
