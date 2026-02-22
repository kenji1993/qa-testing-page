import { useCartStore } from '../../../store/useCartStore';

/**
 * Shared read-only hook for components that only need to know
 * the total item count and how to open the drawer.
 * Used by: Header, LandingBanner.
 */
export function useCartSummary() {
    const getTotalItems = useCartStore((state) => state.getTotalItems);
    const openDrawer = useCartStore((state) => state.openDrawer);
    const totalItems = getTotalItems();

    return { totalItems, openDrawer };
}
