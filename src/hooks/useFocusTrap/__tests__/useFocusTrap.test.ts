import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { useFocusTrap } from '../src/useFocusTrap';


function createContainer() {
    const container = document.createElement('div');
    const btn1 = document.createElement('button');
    btn1.textContent = 'First';
    const btn2 = document.createElement('button');
    btn2.textContent = 'Second';
    const btn3 = document.createElement('button');
    btn3.textContent = 'Third';
    container.append(btn1, btn2, btn3);
    document.body.appendChild(container);
    return { container, btn1, btn3 };
}

describe('useFocusTrap', () => {
    let container: HTMLDivElement;
    let btn1: HTMLButtonElement;
    let btn3: HTMLButtonElement;

    beforeEach(() => {
        ({ container, btn1, btn3 } = createContainer());
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    it('should focus the first focusable element when activated', () => {
        const ref = { current: container };
        renderHook(({ active }) => useFocusTrap(ref, active), {
            initialProps: { active: false },
        });

        const { rerender } = renderHook(({ active }) => useFocusTrap(ref, active), {
            initialProps: { active: true },
        });
        expect(document.activeElement).toBe(btn1);
        rerender({ active: true });
    });

    it('should restore focus to the previously focused element when deactivated', () => {
        const trigger = document.createElement('button');
        trigger.textContent = 'Trigger';
        document.body.appendChild(trigger);
        trigger.focus();
        expect(document.activeElement).toBe(trigger);

        const ref = { current: container };
        const { rerender } = renderHook(({ active }) => useFocusTrap(ref, active), {
            initialProps: { active: true },
        });

        act(() => { rerender({ active: false }); });
        expect(document.activeElement).toBe(trigger);

        document.body.removeChild(trigger);
    });

    it('should wrap Tab from last element to first', () => {
        const ref = { current: container };
        renderHook(({ active }) => useFocusTrap(ref, active), {
            initialProps: { active: true },
        });

        btn3.focus();
        act(() => {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        });
        expect(document.activeElement).toBe(btn1);
    });

    it('should wrap Shift+Tab from first element to last', () => {
        const ref = { current: container };
        renderHook(({ active }) => useFocusTrap(ref, active), {
            initialProps: { active: true },
        });

        btn1.focus();
        act(() => {
            document.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true })
            );
        });
        expect(document.activeElement).toBe(btn3);
    });

    it('should not trap focus when isActive is false', () => {
        const ref = { current: container };
        renderHook(({ active }) => useFocusTrap(ref, active), {
            initialProps: { active: false },
        });

        btn1.focus();
        act(() => {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        });

        expect(document.activeElement).toBe(btn1);
    });
});
