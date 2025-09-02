'use client';

import { useState } from 'react';
import Modal from './Modal';
import ModalInfoContent from './ModalInfoContent';

export default function InfoButtonModal() {
  const [open, setOpen] = useState(false);

  return (
    <> <svg onClick={() => setOpen(true)}
        className="absolute w-6 h-6 sm:w-9 sm:h-9 sm:top-25 sm:right-2/5 top-17 right-2/9" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <g stroke="#e6c155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
    <circle cx="20" cy="20" r="11" />
    <line x1="20" y1="15" x2="20" y2="15" />
    <line x1="20" y1="19" x2="20" y2="25" />
  </g>
</svg>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalInfoContent />
      </Modal>
    </>
  );
}
