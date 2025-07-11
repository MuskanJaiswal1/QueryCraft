import React, {useRef, useEffect } from "react";

const ContextMenu = ({ position, onClose }) => {

  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      className="absolute bg-white border rounded shadow px-4 py-2 text-sm"
      style={{ top: position.y, left: position.x }}
      ref={menuRef}
    >
      Hello World
    </div>
  );
};

export default ContextMenu;
