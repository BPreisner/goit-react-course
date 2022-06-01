import { useState } from 'react';

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
  };

  const open = () => {
    setIsOpen(true);
  };

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return {
    isOpen,
    close,
    open,
    toggle,
  };
};
