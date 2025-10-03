'use client'
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ToggleAspectListBtn ({ 
  children, 
  buttonLabel = "Aspect List", 
  className = "", 
  dropdownClassName = "", 
  position = "",
  reverseIconOrder = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const fadeZoom = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 },
  };
 const icon = reverseIconOrder
    ? isOpen ?  "▲" : "▼"
    : isOpen ? "▼" : "▲"

  return (
    <div className={` ${className}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="btnEffect absolute sm:left-3">
        {`${buttonLabel} ${icon}`}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...fadeZoom}
            className={`z-10 ${position} ${dropdownClassName}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

