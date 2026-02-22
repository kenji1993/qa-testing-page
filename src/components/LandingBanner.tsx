import React from 'react';
import { Flame, Star } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { RESTAURANT_NAME } from '../data/products';

const LandingBanner: React.FC = () => {
    const openDrawer = useCartStore((s) => s.openDrawer);
    const getTotalItems = useCartStore((s) => s.getTotalItems);
    const totalItems = getTotalItems();

    return (
        <section
            data-testid="hero-section"
            className="relative flex min-h-[420px] items-center overflow-hidden bg-[#111111]"
        >
            {/* Background image with overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1400&q=80')",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-transparent" />

            <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
                <div className="max-w-xl">
                    {/* Badge */}
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f5a623]/30 bg-[#f5a623]/10 px-4 py-1.5 text-sm font-medium text-[#f5a623]">
                        <Flame className="h-4 w-4" />
                        Parrilla Argentina desde 1987
                    </div>

                    <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                        {RESTAURANT_NAME}
                    </h1>
                    <p className="mb-8 text-lg text-[#aaaaaa]">
                        El mejor asado del barrio, a la parrilla con leña de quebracho.
                        Pedí desde nuestra carta y armá tu pedido por WhatsApp en segundos.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <a
                            href="#menu"
                            data-testid="hero-see-menu-btn"
                            className="rounded-2xl bg-[#c8102e] px-6 py-3 font-semibold text-white transition-all hover:bg-[#a50d26] active:scale-95"
                        >
                            Ver la carta
                        </a>
                        {totalItems > 0 && (
                            <button
                                onClick={openDrawer}
                                data-testid="hero-view-cart-btn"
                                className="flex items-center gap-2 rounded-2xl border border-[#2e2e2e] bg-[#1e1e1e] px-6 py-3 font-semibold text-white transition-all hover:border-[#c8102e]/50 active:scale-95"
                            >
                                Mi pedido ({totalItems})
                            </button>
                        )}
                    </div>

                    {/* Social proof */}
                    <div className="mt-8 flex items-center gap-2 text-sm text-[#aaaaaa]">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-[#f5a623] text-[#f5a623]" />
                            ))}
                        </div>
                        <span>4.9/5 · Más de 2.000 pedidos este mes</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingBanner;
