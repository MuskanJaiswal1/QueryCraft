import React, { useEffect, useRef } from "react";
import { useFlow } from "../context/FlowContext";

const ContextMenu = ({ position, onClose }) => {
  const { nodes, setNodes, setContextMenu } = useFlow();
  const menuRef = useRef(null);

  const nodeId = position?.nodeId;
  const currentNode = nodes.find((n) => n.id === nodeId);

  const handleDelete = () => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    onClose();
  };

  const handleDuplicate = () => {
    if (!currentNode) return;
    const newNode = {
      ...currentNode,
      id: Date.now().toString(),
      position: {
        x: currentNode.position.x + 80,
        y: currentNode.position.y + 80,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    onClose();
  };

  const handleEdit = () => {
    alert(`Edit node "${currentNode?.data?.label || nodeId}"`);
    onClose();
  };

  // 🧠 Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!position) return null;

  return (
    <div
      ref={menuRef}
      className="absolute z-50 bg-white shadow-lg border rounded w-40"
      style={{ top: position.y, left: position.x }}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="text-sm py-1">
        {/* <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={handleEdit}
        >
          ✏️ Next step with AI
        </li> */}
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={handleDuplicate}
        >
          📄 Duplicate
        </li>
        <li
          className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
          onClick={handleDelete}
        >
          🗑️ Delete
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
