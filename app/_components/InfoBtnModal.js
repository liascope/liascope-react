'use client';

import { useState } from 'react';
import Modal from './Modal';
import ModalInfoContent from './ModalInfoContent';

export default function InfoButtonModal() {
  const [open, setOpen] = useState(false);

  return (
    <>  <button
        onClick={() => setOpen(true)}
        className="px-2 hover:text-[#607f6a] absolute text-2xl top-25 right-2/5" > 🛈
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalInfoContent />
      </Modal>
    </>
  );
}
