import React from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCartDrawer } from '../../../hooks/useCartDrawer';
import { buildWhatsAppOrder } from '../../../use-cases/buildWhatsAppOrder';

const CartDrawer: React.FC = () => {
    const { items, isDrawerOpen, total, closeDrawer, removeItem, updateQuantity, clearCart } = useCartDrawer();

    const handleWhatsAppOrder = () => {
        if (items.length === 0) return;
        window.open(buildWhatsAppOrder(items, total), '_blank');
    };

    return (
        <>
            {/* Backdrop */}
            {isDrawerOpen && (
                <div
                    data-testid="cart-backdrop"
                    onClick={closeDrawer}
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    aria-hidden="true"
                />
            )}

            {/* Drawer panel */}
            <aside
                data-testid="cart-drawer"
                role="dialog"
                aria-label="Carrito de compras"
                aria-modal="true"
                className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[#1a1a1a] shadow-2xl transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#2e2e2e] px-5 py-4">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-[#c8102e]" />
                        <h2 className="text-lg font-bold text-white">Tu Pedido</h2>
                        {items.length > 0 && (
                            <span className="rounded-full bg-[#c8102e] px-2 py-0.5 text-xs font-bold text-white">
                                {items.length}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {items.length > 0 && (
                            <button
                                onClick={clearCart}
                                data-testid="clear-cart-btn"
                                aria-label="Vaciar carrito"
                                className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs text-[#aaaaaa] transition-colors hover:bg-[#2e2e2e] hover:text-red-400"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                Vaciar
                            </button>
                        )}
                        <button
                            onClick={closeDrawer}
                            data-testid="close-cart-btn"
                            aria-label="Cerrar carrito"
                            className="flex h-9 w-9 items-center justify-center rounded-full text-[#aaaaaa] transition-colors hover:bg-[#2e2e2e] hover:text-white"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Items list */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                    {items.length === 0 ? (
                        <div
                            data-testid="cart-empty-state"
                            className="flex h-full flex-col items-center justify-center gap-4 text-center"
                        >
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2e2e2e]">
                                <ShoppingBag className="h-9 w-9 text-[#555555]" />
                            </div>
                            <p className="text-lg font-semibold text-white">Tu carrito está vacío</p>
                            <p className="text-sm text-[#aaaaaa]">
                                Agregá productos de la carta para hacer tu pedido.
                            </p>
                            <button
                                onClick={closeDrawer}
                                className="mt-2 rounded-xl bg-[#c8102e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a50d26]"
                            >
                                Ver la carta
                            </button>
                        </div>
                    ) : (
                        <ul className="flex flex-col gap-4" data-testid="cart-items-list">
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    data-testid={`cart-item-${item.id}`}
                                    className="flex gap-4 rounded-xl bg-[#222222] p-3"
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                                    />
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="flex items-start justify-between gap-2">
                                            <span className="text-sm font-semibold leading-tight text-white">
                                                {item.name}
                                            </span>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                data-testid={`remove-item-btn-${item.id}`}
                                                aria-label={`Eliminar ${item.name}`}
                                                className="flex-shrink-0 text-[#555555] transition-colors hover:text-red-400"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            {/* Quantity controls */}
                                            <div className="flex items-center gap-1 rounded-lg bg-[#1a1a1a] p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    data-testid={`decrease-qty-btn-${item.id}`}
                                                    aria-label={`Disminuir cantidad de ${item.name}`}
                                                    className="flex h-6 w-6 items-center justify-center rounded-md text-[#aaaaaa] transition-colors hover:bg-[#2e2e2e] hover:text-white active:scale-95"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span
                                                    data-testid={`item-quantity-${item.id}`}
                                                    className="w-6 text-center text-sm font-bold text-white"
                                                >
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    data-testid={`increase-qty-btn-${item.id}`}
                                                    aria-label={`Aumentar cantidad de ${item.name}`}
                                                    className="flex h-6 w-6 items-center justify-center rounded-md text-[#aaaaaa] transition-colors hover:bg-[#2e2e2e] hover:text-white active:scale-95"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <span
                                                data-testid={`item-subtotal-${item.id}`}
                                                className="text-sm font-semibold text-[#f5a623]"
                                            >
                                                ${(item.price * item.quantity).toLocaleString('es-AR')}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer with total and WhatsApp CTA */}
                {items.length > 0 && (
                    <div className="border-t border-[#2e2e2e] px-5 py-5">
                        {/* Subtotals breakdown */}
                        <div className="mb-4 space-y-1">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between text-xs text-[#777777]">
                                    <span>{item.name} x{item.quantity}</span>
                                    <span>${(item.price * item.quantity).toLocaleString('es-AR')}</span>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="mb-5 flex items-center justify-between rounded-xl bg-[#111111] px-4 py-3">
                            <span className="text-sm font-semibold text-[#aaaaaa]">Total del pedido</span>
                            <span
                                data-testid="cart-total"
                                className="text-xl font-bold text-[#f5a623]"
                            >
                                ${total.toLocaleString('es-AR')}
                            </span>
                        </div>

                        {/* WhatsApp CTA */}
                        <button
                            onClick={handleWhatsAppOrder}
                            data-testid="whatsapp-order-btn"
                            aria-label="Hacer pedido por WhatsApp"
                            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-base font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all duration-200 hover:bg-[#1ebe5d] active:scale-[0.98]"
                        >
                            <MessageCircle className="h-5 w-5" />
                            Hacer pedido por WhatsApp
                        </button>
                        <p className="mt-2 text-center text-[11px] text-[#555555]">
                            Te redirigiremos a WhatsApp con tu pedido listo para enviar.
                        </p>
                    </div>
                )}
            </aside>
        </>
    );
};

export default CartDrawer;
