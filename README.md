# 🥩 La Parrilla del Gaucho — Menú Digital Interactivo

Landing page de un menú digital para una parrilla argentina. El usuario navega la carta, agrega productos a un carrito y finaliza su pedido directamente por WhatsApp con un mensaje pre-armado.

Diseñado también como **página de práctica para testing automatizado**, con atributos `data-testid` semánticos en todos los elementos interactivos.

![Grabaciondepantalla2026-02-22alas2 46 25p m -ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/fa4c6826-f05c-4510-b10e-08728f6609df)

---

## Stack Tecnológico

| Tecnología | Rol |
|---|---|
| [React 18](https://react.dev/) + [Vite 7](https://vite.dev/) | Framework UI + bundler/dev server |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático en todo el proyecto |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilos utilitarios (configuración CSS-first) |
| [Zustand](https://zustand-demo.pmnd.rs/) | Estado global del carrito de compras |
| [Lucide React](https://lucide.dev/) | Librería de íconos SVG |

---

## Características

- **Carta agrupada por categoría** — productos organizados en un grid responsivo (móvil, tablet, desktop)
- **Carrito global con Zustand** — estado compartido entre componentes sin prop drilling
- **Drawer deslizante** — panel lateral con lista de ítems, controles de cantidad (+/−) y subtotales en tiempo real
- **Integración WhatsApp** — el botón "Hacer pedido" genera un mensaje con el resumen completo de la compra (URL-encoded) y redirige a `wa.me`
- **Feedback visual** — botón de agregar con animación de confirmación, badge de cantidad sobre la card y en el header
- **Tema oscuro** — diseño premium con paleta de colores personalizada vía CSS custom properties

---

## Estructura del Proyecto

```
src/
├── types/
│   └── index.ts              # Interfaces: Product, CartItem
├── data/
│   └── products.ts           # Mock de productos + constantes (WA number, restaurant name)
├── store/
│   └── useCartStore.ts       # Zustand store: add, remove, updateQuantity, clear, getTotal
└── components/
    ├── Header.tsx             # Sticky header con logo y badge del carrito
    ├── LandingBanner.tsx      # Banner principal con propuesta de valor y CTA
    ├── ProductList.tsx        # Grid de productos agrupado por categoría
    ├── ProductCard.tsx        # Card individual: imagen, info, botón agregar
    ├── CartDrawer.tsx         # Panel lateral: resumen, totales, botón WhatsApp
    └── Footer.tsx             # Info del restaurante y link de contacto WA
```

---

## Testing Automatizado

La aplicación está preparada para pruebas E2E con **[Playwright](https://playwright.dev/)** u otras herramientas de automatización. Todos los elementos interactivos cuentan con atributos `data-testid` semánticos:

| `data-testid` | Elemento |
|---|---|
| `cart-icon-btn` | Botón del carrito en el header |
| `cart-item-count` | Badge con cantidad total de ítems |
| `product-card-{id}` | Tarjeta de cada producto |
| `product-price-{id}` | Precio del producto |
| `add-to-cart-btn-{id}` | Botón "Agregar al carrito" |
| `quantity-badge-{id}` | Badge de cantidad sobre la imagen del producto |
| `cart-drawer` | Panel lateral del carrito |
| `cart-items-list` | Lista de ítems en el carrito |
| `cart-item-{id}` | Ítem individual dentro del carrito |
| `increase-qty-btn-{id}` | Botón para aumentar cantidad |
| `decrease-qty-btn-{id}` | Botón para disminuir cantidad |
| `item-quantity-{id}` | Cantidad actual del ítem |
| `item-subtotal-{id}` | Subtotal del ítem |
| `remove-item-btn-{id}` | Botón para eliminar ítem del carrito |
| `cart-total` | Total del pedido |
| `clear-cart-btn` | Botón para vaciar el carrito |
| `cart-empty-state` | Estado vacío del carrito |
| `whatsapp-order-btn` | Botón principal de pedido por WhatsApp |

> `{id}` corresponde al identificador del producto (ej: `add-to-cart-btn-1`, `cart-item-3`).

### Ejemplo con Playwright

```ts
// Agregar un producto y verificar el total
await page.getByTestId('add-to-cart-btn-1').click();
await page.getByTestId('cart-icon-btn').click();
await expect(page.getByTestId('cart-total')).toBeVisible();
await page.getByTestId('whatsapp-order-btn').click();
```

---

## Instalación y Desarrollo

```bash
npm install
npm run dev       # Inicia el servidor en http://localhost:5173
npm run build     # Build de producción
```

