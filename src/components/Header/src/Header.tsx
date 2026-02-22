import React from 'react';
import { ShoppingCart, Flame } from 'lucide-react';
import { useCartSummary } from '../../../hooks/useCartSummary';
import { RESTAURANT_NAME } from '../../../data/products';

const Header: React.FC = () => {
    const { totalItems, openDrawer } = useCartSummary();

    return (
        <header className="sticky top-0 z-40 w-full border-b border-[#2e2e2e] bg-[#111111]/95 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
                {/* Logo */}
                <div className="flex items-center gap-2" data-testid="header-logo">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c8102e]">
                        <Flame className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-base font-bold tracking-wide text-white sm:text-lg">
                            {RESTAURANT_NAME}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-[#f5a623]">
                            Parrilla Argentina
                        </span>
                    </div>
                </div>

                {/* Cart Button */}
                <button
                    onClick={openDrawer}
                    data-testid="cart-icon-btn"
                    aria-label={`Abrir carrito, ${totalItems} productos`}
                    className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#2e2e2e] bg-[#1e1e1e] text-white transition-all duration-200 hover:border-[#c8102e] hover:bg-[#c8102e]/10 active:scale-95"
                >
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                        <span
                            data-testid="cart-item-count"
                            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c8102e] text-[10px] font-bold text-white ring-2 ring-[#111111]"
                        >
                            {totalItems > 99 ? '99+' : totalItems}
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
