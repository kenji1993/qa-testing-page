import type { CartItem } from '../../../types';
import { WHATSAPP_NUMBER, RESTAURANT_NAME } from '../../../data/products';

/**
 * Pure use-case: given a list of cart items and the order total,
 * builds and returns the WhatsApp deep-link URL with a pre-filled message.
 */
export function buildWhatsAppOrder(items: CartItem[], total: number): string {
    const lines = items.map(
        (item) =>
            `• ${item.name} x${item.quantity} — $${(item.price * item.quantity).toLocaleString('es-AR')}`
    );

    const message = [
        `¡Hola ${RESTAURANT_NAME}! 👋`,
        `Me gustaría hacer el siguiente pedido:`,
        ``,
        ...lines,
        ``,
        `*Total: $${total.toLocaleString('es-AR')}*`,
        ``,
        `Muchas gracias! 🥩🔥`,
    ].join('\n');

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
