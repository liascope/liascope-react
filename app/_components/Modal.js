'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import ModalInfoContent from './ModalInfoContent';

export default function Modal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  if (!isOpen || !mounted) return null;
  return createPortal(
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white max-w-2xl w-full p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="fixed  hover:text-black"
        >
          ✕
        </button>
      <ModalInfoContent/>
      </div>
    </div>,
    document.body
  );
}
