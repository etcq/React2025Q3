import { useModalControl } from '@/core/stores/modal-control-store';
import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export function Modal({ children }: { children: ReactNode }) {
  const modal = useRef<HTMLDivElement | null>(null);
  const { status, setModalStatus } = useModalControl((state) => state);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? setModalStatus(false) : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    const closeMenu = (event: MouseEvent): void => {
      if (
        modal.current &&
        event.target instanceof Node &&
        !modal.current.contains(event.target)
      ) {
        setModalStatus(false);
      }
    };
    const timeout = setTimeout(() => {
      document.addEventListener('click', closeMenu);
    }, 0);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('keydown', closeOnEscapeKey);
      document.removeEventListener('click', closeMenu);
    };
  }, [setModalStatus, status]);

  if (!status) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-20 bg-slate-500/50 flex items-center justify-center"
      data-testid="overlay"
    >
      <div ref={modal}>{children}</div>
    </div>,
    document.body
  );
}
