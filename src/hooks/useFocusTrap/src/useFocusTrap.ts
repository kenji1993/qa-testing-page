import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTORS = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Traps keyboard focus inside `containerRef` while `isActive` is true.
 * Saves the previously focused element and restores it when `isActive` becomes false.
 *
 */
export function useFocusTrap(
    containerRef: React.RefObject<HTMLElement | null>,
    isActive: boolean
) {
    const previouslyFocusedRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isActive) {
            // Restore focus to whatever was active before the trap opened
            previouslyFocusedRef.current?.focus();
            previouslyFocusedRef.current = null;
            return;
        }

        // Save currently focused element before trapping
        previouslyFocusedRef.current = document.activeElement as HTMLElement;

        // Focus the first focusable element inside the container
        const container = containerRef.current;
        if (!container) return;

        const focusable = Array.from(
            container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
        );
        focusable[0]?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab' || !container) return;

            const focusableNow = Array.from(
                container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
            );
            if (focusableNow.length === 0) return;

            const first = focusableNow[0];
            const last = focusableNow[focusableNow.length - 1];

            if (e.shiftKey) {
                // Shift+Tab: if focus is on first, wrap to last
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                // Tab: if focus is on last, wrap to first
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isActive, containerRef]);
}
